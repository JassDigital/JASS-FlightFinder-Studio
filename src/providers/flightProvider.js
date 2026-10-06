
export class FlightProvider {
  constructor(name = "Base Provider") { this.name = name; }
  async search(criteria) {
    throw new Error(`${this.name}: search() is not implemented`);
  }
  async getOffer(id) {
    throw new Error(`${this.name}: getOffer() is not implemented`);
  }
}
