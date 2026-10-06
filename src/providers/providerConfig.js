
export const providerCatalog = {
  demo: {
    id: "demo",
    name: "JASS Demo Provider",
    status: "ready",
    requiresKey: false
  },
  skyscanner: {
    id: "skyscanner",
    name: "Skyscanner",
    status: "adapter-ready",
    requiresKey: true,
    env: "JASS_SKYSCANNER_API_KEY"
  },
  duffel: {
    id: "duffel",
    name: "Duffel",
    status: "adapter-ready",
    requiresKey: true,
    env: "JASS_DUFFEL_API_TOKEN"
  },
  amadeus: {
    id: "amadeus",
    name: "Amadeus",
    status: "adapter-ready",
    requiresKey: true,
    env: "JASS_AMADEUS_CLIENT_ID + JASS_AMADEUS_CLIENT_SECRET"
  }
};

export function getProviderConfig(id) {
  return providerCatalog[id] || providerCatalog.demo;
}
