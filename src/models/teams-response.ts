export interface Level {
  key: string;
  text: string;
}

export interface Button {
  description: string;
  text: string;
  action: string;
  color: string;
  popupDescription: string;
}

export interface Team {
  startTime: string;
  endTime: string;
  title: string;
  activityId: number;
  bookingId: string;
  payment_type: string;
  participationId: string;
  instructor: string;
  location: string;
  centerName: string;
  centerUrl: string;
  duration: number;
  activityUrl: string;
  level: Level;
  button: Button;
}

export interface ITeamsResponse {
  date: string;
  items: Team[];
}
