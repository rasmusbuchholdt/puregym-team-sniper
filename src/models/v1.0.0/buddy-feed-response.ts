// https://www.fitnessworld.com/dk/api/v1.0.0/buddies/friendsfeed
interface FriendsFeedResponse {
  data: Data;
  status: string;
}

interface Data {
  list: List[];
}

interface List {
  id: number;
  description: string;
  title: string;
  action: Action;
  icon?: string;
  user_id: number;
  type: string;
  newsfeed_identifier: string;
  created_at: string;
  updated_at: string;
  center_id: number;
  center_name: string;
  name: string;
  buddy_id: number;
}

interface Action {
  type: string;
  buddy_id: number;
  category: string;
  classId: string;
}