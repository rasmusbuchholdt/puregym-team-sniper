import axios, { AxiosInstance } from 'axios';

import { ActivitiesResponse } from '../models/activities/activities';
import { BookingsResponse } from '../models/bookings/bookings';
import {
  BookingsBookRequest,
  BookingsBookResponse,
} from '../models/bookings/bookings-book';
import {
  BookingsCancelBookRequest,
  BookingsCancelBookResponse,
} from '../models/bookings/bookings-cancel-book';
import { BookingsSearchResponse } from '../models/bookings/bookings-search';
import {
  BookingsShowUpRequest,
  BookingsShowUpResponse,
} from '../models/bookings/bookings-show-up';
import { CentersResponse } from '../models/centers/centers';
import { UserMeResponse } from './../models/user/user-me';

export class FitnessWorldApiClient {
  private _client: AxiosInstance;
  private _cookie?: string;

  constructor(cookie?: string) {
    this._client = axios.create({
      baseURL: 'https://www.fitnessworld.com/dk/api/v1.0.0/',
    });
    this._cookie = cookie;
  }

  async book(team: any) {
    const response = await this._client.post<BookingsBookResponse>(
      'bookings/book', {
      headers: {
        Cookie: this._cookie,
      },
      data: {
        bookingId: team.bookingId,
        activityId: team.activityId
      } as BookingsBookRequest
    }
    );
    return response.data;
  }

  async cancelBook(participationId: string) {
    const response = await this._client.post<BookingsCancelBookResponse>(
      'bookings/cancelBook',
      {
        headers: {
          Cookie: this._cookie,
        },
        data: {
          participationId
        } as BookingsCancelBookRequest
      }
    );
    return response.data;
  }

  async showUp(participationId: string) {
    const response = await this._client.post<BookingsShowUpResponse>(
      'bookings/showUp',
      {
        headers: {
          Cookie: this._cookie,
        },
        data: {
          participationId
        } as BookingsShowUpRequest
      }
    );
    return response.data;
  }

  async getBookings() {
    // TODO: Try catch
    const response = await this._client.get<Array<BookingsResponse>>('bookings', {
      headers: {
        Cookie: this._cookie,
      }
    });
    return response.data;
  }

  async searchBookings(centerIds?: number[], activityIds?: number[]) {


    try {
      const response = await this._client.post<BookingsSearchResponse>('bookings/search', {
        headers: {
          Cookie: this._cookie,
        },
        // data: {
        //   activities: activityIds?.map(e => e),
        //   centers: centerIds?.map(e => e),
        //   startTime: '05:00',
        //   endTime: '23:00',
        //   weekdays: [0, 1, 2, 3, 4, 5, 6]
        // } as BookingsSearchRequest
        data: JSON.stringify({
          centers: [115]
        })
      });
      return response.data;

    } catch (error) {
      console.log(error);
      console.log(this._cookie);
    }
  }

  async getActivities() {
    const response = await this._client.get<ActivitiesResponse>('activities', {
      headers: {
        Cookie: this._cookie,
      }
    });
    return response.data;
  }

  async getCenters() {
    const response = await this._client.get<CentersResponse>('centers', {
      headers: {
        Cookie: this._cookie,
      }
    });
    return response.data;
  }

  async getMe() {
    const response = await this._client.get<UserMeResponse>('user/me', {
      headers: {
        Cookie: this._cookie,
      }
    });
    return response.data;
  }
}
