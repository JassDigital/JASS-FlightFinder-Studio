# JASS FlightFinder Server Boundary

The desktop renderer must not hold production provider secrets.

Recommended deployment:

```text
Electron/React
    |
    v
JASS Flight API
    |
    +-- Skyscanner
    +-- Duffel
    +-- Amadeus
```

Environment variables belong on the server:

- `JASS_SKYSCANNER_API_KEY`
- `JASS_DUFFEL_API_TOKEN`
- `JASS_AMADEUS_CLIENT_ID`
- `JASS_AMADEUS_CLIENT_SECRET`

V0.4 deliberately provides adapter boundaries rather than pretending that a provider account or commercial API entitlement exists.
