import axios, { AxiosError, AxiosInstance } from 'axios';
import qs from 'qs';

import { getFakeHeaders, parseCookieHeaders } from './../helpers';

export class FitnessWorldAuthenticationClient {
  private _client?: AxiosInstance;

  constructor() {
    this._client = axios.create({
      timeout: 10000,
    });
  }

  async logIn(email: string, password: string) {
    return await this._client
      ?.post<string>(
        'https://www.fitnessworld.com/dk2/?destination=/dk2/front',
        qs.stringify({
          form_id: 'user_login_form',
          name: email,
          pass: password,
        }),
        {
          maxRedirects: 0,
          withCredentials: true,
          headers: getFakeHeaders(),
        }
      )
      .catch((error: Error | AxiosError) => {
        if (
          axios.isAxiosError(error) &&
          error.response?.headers['set-cookie']
        ) {
          // TODO: Handle wrong login
          return parseCookieHeaders(error.response?.headers['set-cookie']);
        }
      });
  }

  async checkLoggedin(cookie: string) {
    const response = await this._client?.get(
      'https://www.fitnessworld.com/dk2/front?check_logged_in=1',
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
    return response?.status === 200;
  }
}
