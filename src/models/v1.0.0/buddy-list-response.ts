// https://www.fitnessworld.com/dk/api/v1.0.0/buddies/list
interface BuddyListResponse {
  data: Data;
  status: string;
}

interface Data {
  list: List[];
}

interface List {
  id: number;
  exerp_id: string;
  external_id: string;
  is_instructor: number;
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  male: boolean;
  created_at: string;
  updated_at: string;
  facebook_picture?: string;
  apple_user_id: string;
  height: number;
  last_inbody_advertise: string;
  advertise_counter: number;
  external: string;
  ssn_prompt: number;
  ssn_perm: number;
  bca_prompt: number;
  bca_perm: number;
  pr_prompt: number;
  pr_perm: number;
  pt_prompt: number;
  pt_perm: number;
  rating_prompt: number;
  rating_perm: number;
  health_prompt: number;
  health_perm: number;
  privacy_prompt: number;
  privacy_perm: number;
  rating_shown?: string;
  last_device: string;
  next_gdpr_check: string;
  first_load: boolean;
  perm_shown?: string;
  discount_code?: any;
  paymentiq_userid: string;
  app_data: string;
  web_data: string;
  picture: string;
}