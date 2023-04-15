// https://www.fitnessworld.com/dk/api/v1.0.0/centers
interface CenterResponse {
  data: Data;
  status: string;
}

interface Data {
  list: List[];
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
  images: string[] | string;
  center_info: string;
  geo_lat: string;
  geo_lng: string;
  created_at: string;
  updated_at: string;
  search_tags: string;
  meta_title: string;
  meta_description: string;
  categori?: string;
  volution_gym_id?: string;
  volution_gym_group_id?: string;
  opening_hours: Openinghour[];
  centerName: string;
  group_classes: boolean;
  facilities: Facility[];
}

interface Facility {
  id: number;
  name: string;
  icon: string;
  icon_description: string;
  price: string;
  images: string;
  image_app: string;
  description_prices: string;
  description_facilities: string;
  description_app: string;
  created_at: string;
  updated_at: string;
  show_on_facilities: number;
  show_on_prices: number;
  show_on_benefits: number;
  image_link_prices: string;
  sort: string;
  pivot: Pivot;
}

interface Pivot {
  center_id: number;
  facility_id: number;
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
  staffed_from_2?: (null | string)[];
  staffed_until_2?: (null | string)[];
  active: number;
  created_at: string;
  updated_at: string;
  phone_from?: null | string | string;
  phone_until?: null | string | string;
  active_from: string;
  staff_unavailable_from?: any;
  staff_unavailable_until?: any;
  phone_text?: any;
  concrete_date?: any;
  concrete_weekday: string;
}