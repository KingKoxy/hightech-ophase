# O-Phase HiGHtech

Dies ist der Code der Website der O-Phasengruppe HiGHtech am Karlsruher Institut für Technologie.

## Grundlegendes

Die Website ist in **Svelte**, einem JS-Framework mithilfe von **SvelteKit** geschrieben. Für das Styling wird **
WindiCSS** verwendet, welches auf
Tailwind basiert.
Bisher wird lediglich der Schedule von [Contentful](https://www.contentful.com/) gefetcht. Mithilfe von **Vercel** kann
die Seite
automatisch nach jedem Push auf `master` gebaut und deployt werden.

## Projektstruktur

Für jede Page gibt es einen Ordner im Ordner `src/routes`. Die jeweilige `+page.svelte`-Datei ist die Hauptkomponente der
Seite. Weitere nur in dieser Page benötigte Komponenten werden im selben Ordner abgelegt. Allgemeine Komponenten
befinden sich im Ordner `src/lib/components`. Statische Assets werden im Ordner `src/static` abgelegt. 