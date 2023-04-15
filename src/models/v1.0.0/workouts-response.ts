// https://www.fitnessworld.com/dk/api/v1.0.0/user/workouts_list
interface WorkoutListResponse {
  count: number;
  data: Datum[];
  status: string;
}

interface Datum {
  id: number;
  datotid: string;
  type: string;
  kcal: number;
  center: string;
  sent_ml: number;
  user_id: number;
  participation_id?: string;
  data?: any;
  group?: string;
}