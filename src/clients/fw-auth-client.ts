import axios, { AxiosError, AxiosInstance } from 'axios';
import qs from 'qs';

import { getFakeHeaders, parseCookieHeaders } from './../helpers';

export class FitnessWorldAuthenticationClient {
  private client?: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: 10000,
    });
  }

  logIn = async (email: string, password: string) => {
    return await this.client
      ?.post<string>(
        "https://www.fitnessworld.com/dk2/?destination=/dk2/front",
        qs.stringify({
          form_id: "user_login_form",
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
          error.response?.headers["set-cookie"]
        ) {
          return parseCookieHeaders(error.response?.headers["set-cookie"]);
        }
      });
  };

  checkLoggedin = async (cookie: string) => {
    const response = await this.client?.get(
      "https://www.fitnessworld.com/dk2/front?check_logged_in=1",
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
    return response?.status === 200;
  };
}
