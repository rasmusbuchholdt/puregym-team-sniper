export interface ILevel {
  key: string;
  text: string;
}

export interface IButton {
  description: string;
  text: string;
  action: string;
  color: string;
  popupDescription: string;
}

export interface ITeam {
  startTime: string;
  endTime: string;
  title: string;
  activityId: number;
  bookingId: string;
  payment_type: string;
  participationId: string | null;
  instructor: string;
  location: string;
  centerName: string;
  centerUrl: string;
  duration: number;
  activityUrl: string;
  level: ILevel;
  button: IButton;
}

export interface ITeamsResponse {
  date: string;
  items: ITeam[];
}
