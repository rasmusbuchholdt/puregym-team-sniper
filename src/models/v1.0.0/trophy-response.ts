// https://www.fitnessworld.com/dk/api/v1.0.0/user/trophies
interface TrophyResponse {
  data: Data;
  status: string;
}

interface Data {
  badges: Badge[];
}

interface Badge {
  badge_last_active: boolean | string;
  active: boolean;
  title: string;
  subtitle: string;
  icon: string;
  progress: number | string;
  levels: Level[];
  colored_icon: string;
}

interface Level {
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  goal: number;
  skipable?: number;
}