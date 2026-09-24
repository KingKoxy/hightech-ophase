import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'

export function useSiteAssets() {
  const query = useQuery(
    graphql(`
      query GetSiteAssets {
        siteAssetsCollection(limit: 1) {
          items {
            logo {
              url
            }
            groupPhoto {
              url
            }
            hikingPhoto {
              url
            }
            ravePhoto {
              url
            }
          }
        }
      }
    `),
  )

  const siteAssets = computed(() => query.result.value?.siteAssetsCollection?.items[0])

  return {
    logo: computed(() => siteAssets.value?.logo?.url ?? undefined),
    groupPhoto: computed(() => siteAssets.value?.groupPhoto?.url ?? undefined),
    hikingPhoto: computed(() => siteAssets.value?.hikingPhoto?.url ?? undefined),
    ravePhoto: computed(() => siteAssets.value?.ravePhoto?.url ?? undefined),
  }
}
