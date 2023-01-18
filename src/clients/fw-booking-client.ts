import axios, { AxiosInstance } from 'axios';

import { IActivitiesResponse } from '../models/activities-reponse';
import { ITeam, ITeamsResponse } from '../models/teams-response';
import { IUnbookingResponse } from '../models/unbooking-response';

export class FitnessWorldBookingClient {
  private client?: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://www.fitnessworld.com/dk2/api/",
      timeout: 5000,
    });
  }

  bookTeam = async (team: ITeam, cookie: string) => {
    return await this.client?.post<IBookingResponse>(
      "book_activity",
      `bookingId=${team.bookingId}&activityId=${team.activityId}&payment_type=free`,
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
  };

  unbookTeam = (participationId: string, cookie: string) => {
    return this.client?.post<IUnbookingResponse>(
      "unbook_activity",
      `participationId=${participationId}`,
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
  };

  getTeams = (
    centerIds: number[],
    classIds: number[],
    from: Date,
    to: Date
  ) => {
    const params = new URLSearchParams();
    centerIds.map((id) => params.append("centers[]", id.toString()));
    classIds.map((id) => params.append("classes[]", id.toString()));
    params.append("from", "2023-01-17");
    params.append("to", "2023-02-07");
    return this.client?.get<Array<ITeamsResponse>>("search_activities", {
      params,
    });
  };

  getActivities = () => {
    return this.client?.get<IActivitiesResponse>("get_activities");
  };
}
