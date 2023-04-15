// https://www.fitnessworld.com/dk/api/v1.0.0/bca
interface BcaResponse {
  list: List;
  empty_state: Emptystate;
}

interface Emptystate {
  bodytracker_video_url: string;
}

interface List {
  data: Datum[];
}

interface Datum {
  value: number;
  type: string;
  headline: string;
  info: string;
  unit: string;
  label: string;
  description: string;
  icon: string;
  decimal_places: number;
  info_banner: string;
  info_header: string;
  info_header_image: string;
  info_description: string;
  info_tip: string;
  info_footer_image?: string;
  chart?: Chart[];
}

interface Chart {
  classification: string;
  start_value: number;
  end_value: number;
  description: string;
  color: string;
  label_color: string;
}