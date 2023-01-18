import axios, { AxiosInstance } from 'axios';

import { IActivitiesResponse } from '../models/activities-reponse';
import { ITeam, ITeamsResponse } from '../models/teams-response';
import { IUnbookingResponse } from '../models/unbooking-response';

export class FitnessWorldBookingClient {
  private _client?: AxiosInstance;

  constructor() {
    this._client = axios.create({
      baseURL: "https://www.fitnessworld.com/dk2/api/",
      timeout: 5000,
    });
  }

  async bookTeam(team: ITeam, cookie: string) {
    return await this._client?.post<IBookingResponse>(
      "book_activity",
      `bookingId=${team.bookingId}&activityId=${team.activityId}&payment_type=free`,
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
  }

  async unbookTeam(participationId: string, cookie: string) {
    return await this._client?.post<IUnbookingResponse>(
      "unbook_activity",
      `participationId=${participationId}`,
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
  }

  async getTeams(
    centerIds: number[],
    classIds: number[],
    from: Date,
    to: Date
  ) {
    const params = new URLSearchParams();
    centerIds.map((id) => params.append("centers[]", id.toString()));
    classIds.map((id) => params.append("classes[]", id.toString()));
    params.append("from", "2023-01-17");
    params.append("to", "2023-02-07");
    return await this._client?.get<Array<ITeamsResponse>>("search_activities", {
      params,
    });
  }

  async getActivities() {
    return await this._client?.get<IActivitiesResponse>("get_activities");
  }
}
