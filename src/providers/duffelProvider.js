
import { FlightProvider } from "./flightProvider";
import { normalizeOffer } from "./normalizedOffer";

export class DuffelProvider extends FlightProvider {
  constructor({apiToken, baseUrl}={}) {
    super("Duffel");
    this.apiToken = apiToken;
    this.baseUrl = baseUrl || "";
  }

  async search(criteria) {
    if (!this.apiToken || !this.baseUrl)
      throw new Error("Duffel adapter requires a server-side API configuration.");
    throw new Error("Duffel live adapter is configured but endpoint mapping is not yet enabled.");
  }

  normalize(raw) {
    return normalizeOffer(raw, "duffel");
  }
}
