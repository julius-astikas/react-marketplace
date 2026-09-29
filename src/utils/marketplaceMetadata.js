export const marketplaceRegions = [
  {
    name: 'Europe',
    countries: [
      'Norway',
      'Sweden',
      'Denmark',
      'Germany',
      'France',
      'Poland',
      'Lithuania',
    ],
  },
  {
    name: 'UK',
    countries: ['United Kingdom'],
  },
  {
    name: 'US',
    countries: ['United States'],
  },
  {
    name: 'Asia',
    countries: ['Japan', 'South Korea', 'Singapore', 'India'],
  },
]

const locations = marketplaceRegions.flatMap((region) =>
  region.countries.map((country) => ({
    region: region.name,
    country,
  })),
)

// The same product id always lands on the same location.
export function getMarketplaceMetadata(productId) {
  const index = Math.abs(Number(productId)) % locations.length
  return locations[index]
}

export function getCountriesForRegion(region) {
  return (
    marketplaceRegions.find((item) => item.name === region)?.countries ?? []
  )
}

export function withMarketplaceMetadata(product) {
  return {
    ...product,
    marketplace: getMarketplaceMetadata(product.id),
  }
}

export function filterByLocation(products, { region, country }) {
  return products.map(withMarketplaceMetadata).filter((product) => {
    const matchesRegion = !region || product.marketplace.region === region
    const matchesCountry = !country || product.marketplace.country === country
    return matchesRegion && matchesCountry
  })
}
