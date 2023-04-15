// https://www.fitnessworld.com/dk/api/v1.0.0/user/workouts
interface WorkoutsResponse {
  data: Data;
  status: string;
  description: string;
}

interface Data {
  total_kcal: number;
  total_team: number;
  total_workouts: number;
  statistics: Statistic[];
  activities: Activity[];
  continuos_workout: Continuosworkout;
}

interface Continuosworkout {
  title: string;
  detail: string;
  value: string;
  color: string;
  improvement: string;
}

interface Activity {
  title: string;
  detail: string;
  value: string;
  color: string;
}

interface Statistic {
  info: string;
  title: string;
  detail: string;
  value: string;
  color: string;
  improvement: string;
}