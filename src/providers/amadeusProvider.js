
import { FlightProvider } from "./flightProvider";
import { normalizeOffer } from "./normalizedOffer";

export class AmadeusProvider extends FlightProvider {
  constructor({clientId, clientSecret, baseUrl}={}) {
    super("Amadeus");
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseUrl = baseUrl || "";
  }

  async search(criteria) {
    if (!this.clientId || !this.clientSecret || !this.baseUrl)
      throw new Error("Amadeus adapter requires server-side credentials.");
    throw new Error("Amadeus live adapter is configured but endpoint mapping is not yet enabled.");
  }

  normalize(raw) {
    return normalizeOffer(raw, "amadeus");
  }
}
