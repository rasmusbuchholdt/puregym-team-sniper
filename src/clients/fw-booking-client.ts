import axios, { AxiosInstance } from 'axios';

import { useGetDates } from '../helpers';
import { IActivitiesResponse } from '../models/activities-reponse';
import { ITeam, ITeamsResponse } from '../models/teams-response';
import { IUnbookingResponse } from '../models/unbooking-response';

export class FitnessWorldBookingClient {
  private _client?: AxiosInstance;

  constructor() {
    this._client = axios.create({
      baseURL: 'https://www.fitnessworld.com/dk2/api/',
    });
  }

  async bookTeam(team: ITeam, cookie: string) {
    return await this._client?.post<IBookingResponse>(
      'book_activity',
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
      'unbook_activity',
      `participationId=${participationId}`,
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
  }

  async getTeams(centerIds?: number[], classIds?: number[], from?: Date, to?: Date) {
    const params = new URLSearchParams();

    if (centerIds) {
      centerIds.map((id) => params.append('centers[]', id.toString()));
    }
    if (classIds) {
      classIds.map((id) => params.append('classes[]', id.toString()));
    }

    const { today, tomorrow } = useGetDates();
    params.append('from', from ? from.toISOString().split('T')[0] : today.toISOString().split('T')[0]);
    params.append('to', to ? to.toISOString().split('T')[0] : tomorrow.toISOString().split('T')[0]);

    return await this._client?.get<Array<ITeamsResponse>>('search_activities', {
      params,
    });
  }

  async getActivities() {
    return await this._client?.get<IActivitiesResponse>('get_activities');
  }
}
