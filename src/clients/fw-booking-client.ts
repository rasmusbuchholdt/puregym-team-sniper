import axios, { AxiosInstance } from 'axios';

import { IActivitiesResponse } from '../models/activities-reponse';
import { ITeam, ITeamsResponse } from '../models/teams-response';
import { IUnbookingResponse } from '../models/unbooking-response';

export class FitnessWorldBookingClient {
  private _client: AxiosInstance;
  private _cookie?: string;

  constructor(cookie?: string) {
    this._client = axios.create({
      baseURL: 'https://www.fitnessworld.com/dk2/api/',
    });
    this._cookie = cookie;
  }

  async getSearchDaysAllowed() {
    const response = await this._client.get<IUserSearchParamsResponse>(
      'https://www.fitnessworld.com/dk2/api/get_user_search_params',
      {
        headers: {
          Cookie: this._cookie,
        },
      }
    );
    return response.data.search_days_allowed;
  }

  async bookTeam(team: ITeam) {
    const response = await this._client.post<IBookingResponse>(
      'book_activity',
      `bookingId=${team.bookingId}&activityId=${team.activityId}&payment_type=free`,
      {
        headers: {
          Cookie: this._cookie,
        },
      }
    );
    return response.data;
  }

  async unbookTeam(participationId: string) {
    const response = await this._client.post<IUnbookingResponse>(
      'unbook_activity',
      `participationId=${participationId}`,
      {
        headers: {
          Cookie: this._cookie,
        },
      }
    );
    return response.data;
  }

  async getTeams(centerIds?: number[], activityIds?: number[], from?: Date, to?: Date) {
    const params = new URLSearchParams();

    if (activityIds) {
      activityIds.map((id) => params.append('classes[]', id.toString()));
    }
    if (centerIds) {
      centerIds.map((id) => params.append('centers[]', id.toString()));
    }

    // If we don't pass any date range the API will just return the max amount we are allowed in response
    if (from) {
      params.append('from', from.toISOString().split('T')[0]);
    }
    if (to) {
      params.append('to', to.toISOString().split('T')[0]);
    }

    const response = await this._client.get<Array<ITeamsResponse>>('search_activities', {
      params,
      headers: {
        Cookie: this._cookie,
      }
    });
    return response.data;
  }

  async getActivities() {
    const response = await this._client.get<IActivitiesResponse>('get_activities', {
      headers: {
        Cookie: this._cookie,
      }
    });
    return response.data;
  }
}
