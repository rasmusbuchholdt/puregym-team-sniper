import axios, { AxiosInstance } from 'axios';

import { ITeamWithDate } from './../models/team-with-date';

export class DiscordWebhookClient {
  private _client: AxiosInstance;
  private _webhookUrl?: string;

  constructor(webhookUrl?: string) {
    this._client = axios.create();
    this._webhookUrl = webhookUrl;
  }

  async sendMessage(title: string, message: string, color: string) {
    if (!this._webhookUrl) return;
    await this._client.post(
      this._webhookUrl,
      {
        username: 'FW Sniper',
        embeds: [
          {
            title,
            description: message,
            color,
            fields: [
            ]
          }
        ]
      }
    );
  }

  async sendTeamMessage(title: string, color: string, team: ITeamWithDate, message?: string) {
    if (!this._webhookUrl) return;
    await this._client.post(
      this._webhookUrl,
      {
        username: 'FW Sniper',
        embeds: [
          {
            title,
            description: message,
            color,
            fields: [
              { name: 'ID', value: team.team.bookingId },
              { name: 'Date', value: `${team.date} ${team.team.startTime}-${team.team.endTime}` },
              { name: 'Location', value: team.team.location },
              { name: 'Title', value: team.team.title },
              { name: 'Instructor', value: team.team.instructor }
            ]
          }
        ]
      }
    );
  }
}
