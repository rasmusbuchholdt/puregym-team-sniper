// https://www.fitnessworld.com/dk/api/v1.0.0/centers/stats/158
interface CenterStatsResponse {
  data: Data;
  status: string;
}

interface Data {
  list: List;
}

interface List {
  id: number;
  cid: number;
  box_header: string;
  box_color: string;
  active: number;
  is_vp_center: string;
  show_on_holdplan: number;
  show_on_onlinesalg: number;
  opening_date: string;
  slug: string;
  webname: string;
  adress1: string;
  adress2: string;
  city: string;
  zip: string;
  country: string;
  email: string;
  phone: string;
  facebookurl: string;
  images: string;
  center_info: string;
  geo_lat: string;
  geo_lng: string;
  created_at: string;
  updated_at: string;
  search_tags: string;
  meta_title: string;
  meta_description: string;
  categori: string;
  volution_gym_id: string;
  volution_gym_group_id: string;
  opening_hours: Openinghour[];
  centerName: string;
  capacity: Capacity;
}

interface Capacity {
  people_in_center: number;
  max_capacity: number;
  capacity_status: string;
  chart_data: Chartdata;
}

interface Chartdata {
  monday: Monday[];
  tuesday: Monday[];
  wednesday: Monday[];
  thursday: Monday[];
  friday: Monday[];
  saturday: Monday[];
  sunday: Monday[];
}

interface Monday {
  hour: number;
  people_in_center: number;
}

interface Openinghour {
  id: number;
  center_id: number;
  name: string;
  date: string;
  opening: string;
  closing: string;
  staffed_from: string;
  staffed_until: string;
  staffed_from_2?: any;
  staffed_until_2?: any;
  active: number;
  created_at: string;
  updated_at: string;
  phone_from?: string;
  phone_until?: any;
  active_from: string;
  staff_unavailable_from?: any;
  staff_unavailable_until?: any;
  phone_text?: any;
  staffed: Staffed[];
  concrete_date?: any;
  concrete_weekday: string;
}

interface Staffed {
  from: string;
  to: string;
  source: string[];
}