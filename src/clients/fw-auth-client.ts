import axios, { AxiosError, AxiosInstance } from 'axios';
import qs from 'qs';

import { UserMeResponse } from '../models/user/user-me';
import { getFakeHeaders, parseCookieHeaders } from './../helpers';

export class FitnessWorldAuthenticationClient {
  private _client: AxiosInstance;

  constructor() {
    this._client = axios.create({
      timeout: 10000,
      withCredentials: true
    });
  }

  async logIn(email: string, password: string) {
    const sessionCookie = await this.getSessionCookie(email, password) as string | undefined;
    if (!sessionCookie) return;
    const jwt = await this.getJwt(email, password, sessionCookie);

    return '';
  }

  private async getSessionCookie(email: string, password: string) {
    return await this._client
      .post<string>(
        'https://www.fitnessworld.com/dk2/?destination=/dk2/front',
        qs.stringify({
          form_id: 'user_login_form',
          name: email,
          pass: password,
        }),
        {
          maxRedirects: 0,
          headers: getFakeHeaders(),
        }
      )
      .catch((error: Error | AxiosError) => {
        if (
          axios.isAxiosError(error) &&
          error.response?.headers['set-cookie']
        ) {
          return parseCookieHeaders(error.response?.headers['set-cookie']);
        }
      });
  }

  async getJwt(email: string, password: string, cookie: string) {
    const test = await this._client
      .post<string>(
        'https://www.fitnessworld.com/dk2/?destination=/dk2/front',
        qs.stringify({
          form_id: 'user_login_form',
          name: email,
          pass: password,
        }),
        {
          headers: {
            Cookie: cookie,
          },
        }
      );

    const response = await this._client.get<UserMeResponse>('https://www.fitnessworld.com/dk/api/v1.0.0/user/me', {
      headers: {
        Cookie: cookie,
      },
    });
  }
}
