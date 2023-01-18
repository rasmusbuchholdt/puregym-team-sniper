import { FitnessWorldAuthenticationClient } from './fw-auth-client';
import { FitnessWorldBookingClient } from './fw-booking-client';

export class SniperClient {
  private _fwAuthClient = new FitnessWorldAuthenticationClient();
  private _fwBookingClient = new FitnessWorldBookingClient();

  // TODO: Figure out how to handle filters
  private _filters: any;
  private _cookie?: string;

  async logIn() {
    // TODO: Get from env
    const cookie = (await this._fwAuthClient.logIn('', '')) as string;
    if (cookie === undefined) return;
    const isValidCookie = await this._fwAuthClient.checkLoggedin(cookie);
    if (isValidCookie) this._cookie = cookie;
  }

  async getCenters() {
    // TODO: Return all centers with their id's so user can use for filters
  }

  async getClasses() {
    // TODO: Return all classes with their id's so user can use for filters
  }

  async bookTeam() {
    // TODO: Find teams matching the filters and book them
  }

  async unbookTeam() {
    // TODO: Find teams matching the filters and unbook them
  }
}
