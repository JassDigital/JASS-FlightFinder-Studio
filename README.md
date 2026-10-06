# JASS FlightFinder Studio

A flight-search and travel-intelligence workstation.

## V0.1 Foundation

This release intentionally uses mock flight data while establishing the production UI and architecture.

### Features
- Round-trip search interface
- Origin/destination/date controls
- Best Value / Cheapest / Fastest sorting
- Advanced filter panel
- Baggage and connection indicators
- JASS Value Score
- Price signal
- Booking Advisor
- Saved-flight interaction
- Electron desktop shell
- Provider-independent design for future live APIs

## Run

```bash
npm install
npm run dev
```

For Electron:

```bash
npm install
npm run electron:dev
```

Production build:

```bash
npm run build
npm run electron
```

## Planned provider layer

Live providers will be integrated behind a common interface rather than coupling the UI to one vendor:

```text
FlightProvider
  ├── SkyscannerProvider
  ├── DuffelProvider
  └── AmadeusProvider
```

The live integration must handle API credentials securely on the backend and comply with each provider's current usage and commercial terms.

## Roadmap

v0.2 Airport/IATA data
v0.3 Provider abstraction
v0.4 Live search
v0.5 Advanced filters
v0.6 JASS Value Engine
v0.7 True Trip Cost
v0.8 Connection Intelligence
v0.9 Flexible Date Explorer
v1.0 Price History + Fare Watch
v1.1 Trip Manager
v1.2 Multi-city optimizer
v1.3 Booking/deep-link integration
v2.0 Travel Intelligence workstation


## V0.2 Airport & Intelligence Engine

Added:
- Local IATA airport intelligence database
- Airport/city/country lookup data
- Provider abstraction (`FlightProvider`)
- Demo provider implementing the provider contract
- JASS Value Engine with price, duration, stops, baggage and emissions factors
- Ranked itinerary model
- Ready boundary for Skyscanner/Duffel/Amadeus adapters
- No API keys embedded in the desktop client

### Provider contract

```js
const provider = new DemoFlightProvider();
const offers = await provider.search({
  origin: "DEL",
  destination: "YYZ",
  date: "2026-11-15"
});
```

A production provider should implement the same `search()` and `getOffer()` methods.

### Architecture

```text
React UI
  ↓
Search Criteria
  ↓
Flight Provider Interface
  ├── Demo Provider
  ├── Skyscanner Adapter (future)
  ├── Duffel Adapter (future)
  └── Amadeus Adapter (future)
  ↓
Normalized Offers
  ↓
JASS Value Engine
  ↓
Ranked Results
```


## V0.3 Search Intelligence

Added:
- City/IATA/airport autocomplete
- Airport aliases and nearby-airport relationships
- Nearby-airport option
- Round-trip / one-way / multi-city modes
- Multi-city leg editor
- Cabin selector and passenger selector
- Advanced stop, baggage, duration and airline filters
- Flexible-date ±3 day price matrix
- Cheapest / fastest / fewest-stops / best-value sorting
- Multi-select flight comparison bar
- Saved-flight controls
- Search-result empty state
- Expanded search architecture utilities

### Important

V0.3 continues to use demonstration flight offers. Live provider integration remains a separate milestone so that credentials, rate limits and provider-specific commercial rules are never embedded in the desktop renderer.


## V0.4 Live Flight Intelligence Boundary

Added:

- Provider catalog and configuration boundary
- Skyscanner adapter boundary
- Duffel adapter boundary
- Amadeus adapter boundary
- Common normalized-offer model
- True Trip Cost engine
- Connection Risk Analyzer
- Explainable JASS score reasons
- Server-side credential boundary
- `.env.example`
- Production architecture documentation

### Important

V0.4 does **not** fake live API access. Provider-specific authentication, endpoints and commercial permissions must be configured on a backend using the current contract for the selected provider.

The Electron renderer never receives production API secrets.


## V0.5 True Travel Decision Engine

Added:
- Full flight decision drawer
- JASS Decision Score
- True Trip Cost breakdown
- Baggage / journey / connection / fare metrics
- Refundability and changeability summary
- Connection risk visualization
- Explainable “Why JASS recommends it” panel
- Fare warning for low-flexibility tickets
- Provider continuation boundary
- Decision-engine modules separated from UI

The demo uses clearly identified demo offers. It does not claim that demo prices or fare rules are live.
