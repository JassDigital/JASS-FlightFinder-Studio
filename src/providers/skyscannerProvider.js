
import { FlightProvider } from "./flightProvider";
import { normalizeOffer } from "./normalizedOffer";

export class SkyscannerProvider extends FlightProvider {
  constructor({apiKey, baseUrl}={}) {
    super("Skyscanner");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || "";
  }

  async search(criteria) {
    if (!this.apiKey || !this.baseUrl)
      throw new Error("Skyscanner adapter requires a server-side API configuration.");
    // Intentionally kept as an adapter boundary. The exact endpoint/auth flow
    // must follow the current commercial API contract supplied to the account.
    throw new Error("Skyscanner live adapter is configured but endpoint mapping is not yet enabled.");
  }

  normalize(raw) {
    return normalizeOffer(raw, "skyscanner");
  }
}
