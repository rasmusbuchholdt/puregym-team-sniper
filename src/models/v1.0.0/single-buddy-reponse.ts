// https://www.fitnessworld.com/dk/api/v1.0.0/buddies/singleBuddy/{friend_id}
interface SingleBuddyResponse {
  data: Data;
  status: string;
}

interface Data {
  buddy: Buddy;
}

interface Buddy {
  id: number;
  firstname: string;
  lastname: string;
  facebook_picture: string;
  exerp_id: string;
  birthday: string;
  showUserPicture: boolean;
  is_friend: boolean;
  trophies: Trophies;
  totalKcal: number;
  totalteam: number;
  totalworkouts: number;
  weeksInARow: string;
  picture: string;
  newsfeeds: Newsfeed[];
  challenges: Challenge[];
}

interface Challenge {
  id: number;
  title: string;
  description_title: string;
  description: string;
  banner_img: string;
  start_date: string;
  end_date: string;
  publish_date: string;
  goal_type: string;
  goal_value: number;
  created_at: string;
  updated_at: string;
  gif?: string;
  completed_count: number;
  push_message_start?: string;
  push_message_stop?: any;
  test_users?: string;
}

interface Newsfeed {
  id: number;
  description: string;
  title: string;
  action?: Action;
  icon: string;
  user_id: number;
  type: string;
  newsfeed_identifier: string;
  created_at: string;
  updated_at: string;
  center_id?: number;
  center_name: string;
  name: string;
  buddy_id?: number;
}

interface Action {
  buddy_id: number;
  type: string;
  category?: string;
  challenge_type?: string;
  challenge_id?: number;
  user_id?: number;
  classId?: string;
}

interface Trophies {
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
  description: string;
  icon: string;
  goal: number;
  subtitle?: string;
  skipable?: number;
}