// https://www.fitnessworld.com/dk/api/v1.0.0/bookings
interface BookingsResponse {
  data: Datum[];
  status: string;
  banner: Banner;
  empty_state: Emptystate;
}

interface Emptystate {
  classes: any[];
}

interface Banner {
  id: number;
  title: string;
  description: string;
  active: number;
  gif: string;
  image: string;
  type: string;
  created_at: string;
  updated_at: string;
}

interface Datum {
  booking: Booking;
  canShowUp: boolean;
  ownerId: OwnerId;
  ownerName: string;
  participationId: ParticipationId;
  participationListIndex: number;
  personExternalId: string;
  personId: OwnerId;
  personName: string;
  state: string;
  usedOwnerPrivilege: boolean;
  center: Center;
  can_cancel: boolean;
  is_squash: boolean;
  is_beautyangel: boolean;
  is_event: boolean;
  bookedCount: number;
  classCapacity: number;
  dateStartTime: string;
  dateEndTime: string;
  buddies: Buddy[];
  check_in_restrictions: string[];
  outdoor: boolean;
}

interface Buddy {
  id: number;
  name: string;
  picture: string;
}

interface Center {
  cid: number;
  centerName: string;
  adress1: string;
  adress2: string;
  phone: string;
  city: string;
  zip: string;
  facebookurl: string;
  geo_lat: string;
  geo_lng: string;
  opening_hours: Openinghour[];
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
  concrete_date?: any;
  concrete_weekday: string;
}

interface ParticipationId {
  center: number;
  id: number;
  participation_id: string;
}

interface OwnerId {
  center: number;
  id: number;
}

interface Booking {
  activity: Activity;
  bookingId: BookingId;
  date: string;
  endTime: string;
  instructorName: string;
  instructorNames: string[];
  instructors: Instructors;
  name: string;
  roomName: string;
  roomNames: string;
  startTime: string;
}

interface Instructors {
  instructor: Instructor;
}

interface Instructor {
  name: Name;
  personKey: PersonKey;
}

interface PersonKey {
  center: number;
  id: number;
  externalId: string;
}

interface Name {
  first: string;
  full: string;
  last: string;
}

interface BookingId {
  center: number;
  id: number;
  booking_id: string;
}

interface Activity {
  activityId: number;
  colorGroup: ColorGroup;
  group: Group;
  name: string;
  seatBooking: string;
  youtube_id: string;
  activity_description: string;
  image_url: string;
  level: string;
  gif_url: string;
  is_promoted: boolean;
  video_url: string;
  detail_modules: Detailmodules2;
}

interface Detailmodules2 {
  headline_with_description: Headlinewithdescription;
  percentage_bars?: Percentagebar[];
  image?: Image;
  bullet_points?: Bulletpoint;
  list_with_icons?: Listwithicon;
  rating?: Rating;
  image_and_text?: Imageandtext;
  recommended_classes: Recommendedclass[];
}

interface Recommendedclass {
  id: number;
  active: number;
  activate_date: string;
  show_on_holdplan: number;
  show_on_holdtraening: number;
  youtube_id: string;
  image_app?: any;
  image_small: string;
  image_large: string;
  workout_info_app: string;
  level: string;
  kcal: number;
  activity_id: number;
  activity_guid?: any;
  activity_name: string;
  activity_description_web: string;
  activity_description: string;
  activity_hexcolor: string;
  group_id: number;
  group_name: string;
  group_primary_color?: string | string;
  group_secondary_color?: string | string;
  subgroup_name: string;
  subgroup_text: string;
  meta_title: string;
  meta_desc: string;
  created_at: string;
  updated_at: string;
  slug: string;
  signature_class: boolean;
  image_web?: any;
  gif: string;
  video: string;
  extras: string;
  rating?: number | number;
  ratingcount?: number | number;
  gif_url?: (null | string)[];
  is_promoted: boolean;
  video_url?: (null | string)[];
  slider_image_url: string;
  image_fullpath: string;
  detail_modules: Detailmodules;
}

interface Detailmodules {
  headline_with_description: Headlinewithdescription;
  percentage_bars?: (Percentagebar[] | null)[];
  image?: (Image | null)[];
  bullet_points?: (Bulletpoint2 | null)[];
  list_with_icons?: (Listwithicon | null)[];
  rating?: Rating | Rating;
  image_and_text?: Imageandtext;
}

interface Bulletpoint2 {
  title: string;
  description: string;
  focus_points: (string | string)[];
}

interface Imageandtext {
  headline: string;
  description: string;
  image_url: string;
}

interface Rating {
  ratings_count: number;
  average_rating: number;
}

interface Listwithicon {
  title: string;
  list_items: Listitem[];
}

interface Listitem {
  title: string;
  description: string;
  image: string;
}

interface Bulletpoint {
  title: string;
  description: string;
  focus_points: string[];
}

interface Image {
  image_url: string;
}

interface Percentagebar {
  title: string;
  percentage: number;
}

interface Headlinewithdescription {
  headline: string;
  description: string;
}

interface Group {
  bookableViaAPI: boolean;
  id: number;
  name: string;
}

interface ColorGroup {
}