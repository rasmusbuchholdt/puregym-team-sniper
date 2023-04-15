export interface BookingsSearchRequest {
  activities: any[];
  centers: number[];
  endTime: string;
  id: number;
  instructor: string;
  startTime: string;
  title: string;
  weekdays: number[];
}

export interface BookingsSearchResponse {
  data: Datum[];
  status: string;
}

interface Datum {
  activity: Activity;
  bookedCount: number;
  bookingId: BookingId;
  classCapacity: number;
  date: string;
  description: string;
  endTime: string;
  instructorName: string;
  instructorNames: string[];
  instructors: Instructors;
  name: string;
  roomName: string;
  roomNames: string;
  startTime: string;
  waitingListCount: number;
  can_cancel: boolean;
  payment_type: string;
  payment_price?: any;
  is_squash: boolean;
  is_beautyangel: boolean;
  is_event: boolean;
  dateStartTime: string;
  dateEndTime: string;
  center: Center;
  dateTime: string;
  bookingType: string;
  participation?: any;
  buddies: any[];
  hexColor: string;
  check_in_restrictions: string[];
  outdoor: boolean;
}

interface Center {
  cid: string;
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
  id: number;
  image_small: string;
  level: string;
  slug: string;
  youtube_id: string;
  image_url: string;
  subgroup_name: string;
  description: string;
}

interface Group {
  bookableViaAPI: boolean;
  id: number;
  name: string;
}

interface ColorGroup {
}