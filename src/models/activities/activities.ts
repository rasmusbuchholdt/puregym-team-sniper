export interface ActivitiesResponse {
  activities: Activity[];
  status: string;
}

interface Activity {
  id: number;
  active: number;
  activate_date: string;
  show_on_holdplan: number;
  show_on_holdtraening: number;
  youtube_id?: string;
  image_app?: string;
  image_small?: string;
  image_large?: string;
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
  group_primary_color?: string;
  group_secondary_color?: string;
  subgroup_name: string;
  subgroup_text?: string;
  meta_title: string;
  meta_desc: string;
  created_at: string;
  updated_at: string;
  slug: string;
  signature_class: boolean;
  image_web?: any;
  gif?: string;
  video?: string;
  extras?: string;
  rating?: number;
  ratingcount?: number;
  gif_url?: string;
  is_promoted: boolean;
  video_url?: string;
  slider_image_url?: string;
  image_fullpath?: string;
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
  youtube_id?: null | string | string;
  image_app?: (null | string)[];
  image_small?: string;
  image_large?: string;
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
  group_primary_color?: null | string | string;
  group_secondary_color?: null | string | string;
  subgroup_name: string;
  subgroup_text?: null | string | string;
  meta_title: string;
  meta_desc: string;
  created_at: string;
  updated_at: string;
  slug: string;
  signature_class: boolean;
  image_web?: any;
  gif?: string;
  video?: string;
  extras?: string;
  rating?: null | number | number;
  ratingcount?: null | number | number;
  gif_url?: null | string | string;
  is_promoted: boolean;
  video_url?: null | string | string;
  slider_image_url?: string;
  image_fullpath?: string;
  detail_modules: Detailmodules;
}

interface Detailmodules {
  headline_with_description: Headlinewithdescription;
  percentage_bars?: (Percentagebar[] | null)[];
  image?: (Image | null)[];
  bullet_points?: (Bulletpoint2 | null)[];
  list_with_icons?: (Listwithicon | null)[];
  rating?: Rating | Rating | null;
  image_and_text?: Imageandtext2 | Imageandtext | Imageandtext3 | Imageandtext3 | null | null | null;
}

interface Imageandtext3 {
  headline: string;
  description: string;
  image_url: string;
}

interface Imageandtext2 {
  headline: string;
  description: string;
  image_url?: any;
}

interface Bulletpoint2 {
  title: string;
  description: string;
  focus_points: (string | string)[];
}

interface Imageandtext {
  headline: string;
  description: string;
  image_url?: string;
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