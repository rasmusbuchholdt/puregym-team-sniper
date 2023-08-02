import axios, { AxiosError, AxiosInstance } from 'axios';
import qs from 'qs';

import { getFakeHeaders, parseCookieHeaders } from '../helpers';

export class PureGymAuthenticationClient {
  private _client: AxiosInstance;

  constructor() {
    this._client = axios.create({
      timeout: 10000,
    });
  }

  async logIn(email: string, password: string) {
    return await this._client
      .post<string>(
        'https://www.puregym.dk/?destination=/front',
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
          return parseCookieHeaders(error.response?.headers['set-cookie']);
        }
      });
  }

  async checkLoggedin(cookie: string) {
    const response = await this._client.get<IUserSearchParamsResponse>(
      'https://www.puregym.dk/api/get_user_search_params',
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
    // Authenticated users can view 21 days instead of 5
    return response.data.search_days_allowed === 21;
  }
}
