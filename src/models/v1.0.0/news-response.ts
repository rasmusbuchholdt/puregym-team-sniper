// https://www.fitnessworld.com/dk/api/v1.0.0/news
interface NewsResponse {
  data: Data;
  status: string;
}

interface Data {
  list: List[];
  empty_state: Emptystate;
}

interface Emptystate {
  gif: string;
}

interface List {
  id: number;
  user_id: number;
  image_mobile: string;
  title: string;
  slug: string;
  body: string;
  active: number;
  publish_at: string;
  created_at: string;
  status: string;
  type: string;
  gdpr_type?: any;
  addon_type?: any;
  main_menu_item_id?: any;
  activity_id?: any;
  redirect_url?: any;
  gif?: string;
}