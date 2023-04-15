// https://www.fitnessworld.com/dk/api/v1.0.0/user/me
export interface UserResponse {
  data: Data;
  status: string;
  description: string;
}

interface Data {
  user: User;
}

interface User {
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
  showUserPicture: boolean;
  apple_user_id: string;
  height: number;
  last_inbody_advertise?: any;
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
  rating_shown?: any;
  last_device: string;
  next_gdpr_check: string;
  first_load: boolean;
  perm_shown: string;
  discount_code: string;
  paymentiq_userid: string;
  app_data: Appdata;
  web_data?: any;
  address: Address;
  communication: Communication;
  phone: string;
  has_active_membership: boolean;
  total_kcal: number;
  picture: string;
  total_team: number;
  total_workouts: number;
  weeks_in_a_row: string;
  membership: Membership;
  is_premium: boolean;
  is_plus_subscription: boolean;
  book_days_ahead: number;
  available_addons: any[];
  show_workout_programs: boolean;
  age: number;
  allow_bodytracker: boolean;
  allow_bodytracker_mode: string;
  personal_trainer_services: Personaltrainerservices;
  homecenter: number;
  homecenter_info: Homecenterinfo;
  gdpr_status: Gdprstatus;
  show_pt_booking: boolean;
}

interface Gdprstatus {
  bodytracker: Bodytracker;
  personal_trainer: Bodytracker;
  workout_programs: Bodytracker;
  social_security_number: Bodytracker;
  rating_prompt: Bodytracker;
  health_prompt: Bodytracker;
  buddies_search_privacy: Bodytracker;
  pt_booking_consent: Bodytracker;
}

interface Bodytracker {
  gdpr_accept: boolean;
  prompt_user: boolean;
  status: string;
}

interface Homecenterinfo {
  id: number;
  name: string;
  shortname: string;
  webname: string;
  address1: string;
  address2: string;
  city: string;
  zip: string;
  country: string;
  email: string;
  phone: string;
}

interface Personaltrainerservices {
  current_services: any[];
}

interface Membership {
  subscription: Subscription;
  status: string;
  globalId: string;
  freeze: boolean;
  assigned_addons: Assignedaddon[];
  all_in: Assignedaddon;
  has_bt_addon: boolean;
  has_pt_card: boolean;
  mainLabel: string;
  headerLabel: string;
  labels: Label[];
}

interface Label {
  id: number;
  membership_id: number;
  priority: number;
  type: string;
  contents: string;
  created_at: string;
  updated_at: string;
}

interface Assignedaddon {
  key: number;
  name: string;
  price: string;
  startDate: string;
  exerp_name: string;
  price_period_length: number;
  price_period_unit: string;
  image_app: string;
  description_app: string;
}

interface Subscription {
  subscriptionId: SubscriptionId;
  personId: SubscriptionId;
  product: Product;
  state: string;
  subState: string;
  price: string;
  startDate: string;
  billedUntilDate: string;
  freeDays: number;
  windowOfOpportunity: number;
  paymentAgreementKey: PaymentAgreementKey;
  changeRestrictionEnabled: boolean;
}

interface PaymentAgreementKey {
  subId: number;
  center: number;
  id: number;
}

interface Product {
  globalId: string;
  name: string;
  type: string;
  periodUnit: string;
  periodLength: number;
  webname: string;
  sellingPoints: any[];
}

interface SubscriptionId {
  center: number;
  id: number;
}

interface Communication {
  personId: PersonId;
  quickChannel: string;
  allowLetter: boolean;
  allowEmail: boolean;
  allowSMS: boolean;
  allowChargedSMS: boolean;
  allowPhone: boolean;
  email: string;
  mobilePhoneNumber: string;
  wishToReceiveThirdPartyOffers: boolean;
  wishToReceiveEmailNewsLetters: boolean;
}

interface PersonId {
  externalId: string;
  center: number;
  id: number;
}

interface Address {
  address1: string;
  zip: string;
  zipName: string;
  country: string;
}

interface Appdata {
  did_complete_onboarding: boolean;
}