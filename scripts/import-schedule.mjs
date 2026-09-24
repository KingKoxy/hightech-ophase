#!/usr/bin/env node
// Bulk-syncs the O-Phase schedule's Contentful "event" entries from a CSV
// file, so the whole week's schedule can be edited in a spreadsheet instead
// of one-by-one in Contentful's UI.
//
// Usage:
//   npm run schedule:import                  -- dry run against schedule.csv
//   npm run schedule:import -- --apply       -- actually apply the changes
//   npm run schedule:import -- path/to.csv --apply
//
// Safe to re-run: every run REPLACES all "event" entries whose startTime
// falls within the current calendar year with exactly what's in the CSV,
// so editing the CSV and re-running never produces duplicates.
//
// Requires CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN in .env.
// Generate a management token in Contentful under
// Settings -> API keys -> Content management tokens.

process.loadEnvFile()

import { readFileSync } from 'node:fs'
import { createClient } from 'contentful-management'
import { parse } from 'csv-parse/sync'

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT ?? 'master'
const EVENT_CONTENT_TYPE_ID = 'event'
const TIME_ZONE = 'Europe/Berlin'

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const csvPath = args.find((arg) => !arg.startsWith('--')) ?? 'schedule.csv'

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error(
    'Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in your .env file.\n' +
      'Generate a management token in Contentful under Settings -> API keys -> Content management tokens.',
  )
  process.exit(1)
}

// Converts a "YYYY-MM-DD HH:mm" wall-clock time in `timeZone` to a UTC ISO
// string, correctly handling the CEST/CET daylight-saving transition
// (O-Phase runs across late Sept/Oct, which can straddle it).
function timeZoneOffsetMinutes(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date)
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour) % 24,
    Number(map.minute),
    Number(map.second),
  )
  return (asUtc - date.getTime()) / 60_000
}

function localTimeToIso(localDateTime) {
  const naiveUtcGuess = new Date(`${localDateTime.replace(' ', 'T')}Z`)
  if (Number.isNaN(naiveUtcGuess.getTime())) {
    throw new Error(`Invalid startTime "${localDateTime}" -- expected format "YYYY-MM-DD HH:mm"`)
  }
  const offsetMinutes = timeZoneOffsetMinutes(naiveUtcGuess, TIME_ZONE)
  return new Date(naiveUtcGuess.getTime() - offsetMinutes * 60_000).toISOString()
}

function readSchedule(path) {
  const csvText = readFileSync(path, 'utf-8')
  const rows = parse(csvText, { columns: true, skip_empty_lines: true, trim: true })
  return rows.map((row, index) => {
    if (!row.title || !row.startTime || !row.locationName) {
      throw new Error(
        `Row ${index + 2} in ${path} is missing a required column (title, startTime, locationName)`,
      )
    }
    return {
      title: row.title,
      startTime: localTimeToIso(row.startTime),
      locationName: row.locationName,
      locationGoogleMapsLink: row.locationGoogleMapsLink || undefined,
    }
  })
}

async function main() {
  const schedule = readSchedule(csvPath)
  console.log(`Parsed ${schedule.length} event(s) from ${csvPath}.`)

  const client = createClient({ accessToken: MANAGEMENT_TOKEN })
  const space = { spaceId: SPACE_ID, environmentId: ENVIRONMENT_ID }

  const locales = await client.locale.getMany({ ...space, query: { limit: 100 } })
  const defaultLocale = locales.items.find((locale) => locale.default)?.code ?? locales.items[0].code

  const year = new Date().getFullYear()
  const yearStart = new Date(Date.UTC(year, 0, 1)).toISOString()
  const yearEnd = new Date(Date.UTC(year + 1, 0, 1)).toISOString()

  const existingEntries = await client.entry.getMany({
    ...space,
    query: {
      content_type: EVENT_CONTENT_TYPE_ID,
      'fields.startTime[gte]': yearStart,
      'fields.startTime[lt]': yearEnd,
      limit: 1000,
    },
  })

  console.log(`\nExisting ${year} events to replace (${existingEntries.items.length}):`)
  for (const entry of existingEntries.items) {
    console.log(
      `  - [delete] ${entry.fields.title?.[defaultLocale] ?? entry.sys.id} (${entry.fields.startTime?.[defaultLocale]})`,
    )
  }

  console.log(`\nNew events to create (${schedule.length}):`)
  for (const event of schedule) {
    console.log(`  - [create] ${event.title} (${event.startTime})`)
  }

  if (!apply) {
    console.log('\nDry run only, no changes made. Re-run with --apply to write these changes to Contentful.')
    return
  }

  console.log('\nApplying changes...')

  for (const entry of existingEntries.items) {
    const entryId = entry.sys.id
    if (entry.sys.publishedVersion) {
      await client.entry.unpublish({ ...space, entryId })
    }
    await client.entry.delete({ ...space, entryId })
    console.log(`  deleted ${entryId}`)
  }

  for (const event of schedule) {
    const created = await client.entry.create(
      { ...space, contentTypeId: EVENT_CONTENT_TYPE_ID },
      {
        fields: {
          title: { [defaultLocale]: event.title },
          startTime: { [defaultLocale]: event.startTime },
          locationName: { [defaultLocale]: event.locationName },
          ...(event.locationGoogleMapsLink && {
            locationGoogleMapsLink: { [defaultLocale]: event.locationGoogleMapsLink },
          }),
        },
      },
    )
    await client.entry.publish({ ...space, entryId: created.sys.id }, created)
    console.log(`  created & published "${event.title}"`)
  }

  console.log('\nDone.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
