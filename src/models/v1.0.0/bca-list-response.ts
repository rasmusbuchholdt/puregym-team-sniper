// https://www.fitnessworld.com/dk/api/v1.0.0/bca/list
interface BcaListResponse {
  data: Data;
  status: string;
}

interface Data {
  list: List[];
}

interface List {
  data: Datum[];
  id: number;
  user_id: number;
  center_id: number;
  machine_id: number;
  body_fat_mass: number;
  total_body_water: number;
  fat_free_mass: number;
  waist_hip_ratio: number;
  basal_metabolic_rate: number;
  height: number;
  bca_100_khz_rl_impedance: number;
  bca_20_khz_ra_impedance: number;
  bca_20_khz_rl_impedance: number;
  ffm_right_leg: number;
  obesity_degree: number;
  pulse: number;
  bca_100_khz_tr_impedance: number;
  bca_100_khz_ll_impedance: number;
  bca_20_khz_la_impedance: number;
  bca_20_khz_ll_impedance: number;
  mean_artery_pressure: number;
  bfm_trunk: number;
  bfm_right_arm: number;
  bca_20_khz_tr_impedance: number;
  visceral_fat_level: number;
  bfm_percentage_right_arm: number;
  ffm_left_leg: number;
  rate_pressure_product: number;
  ffm_left_arm: number;
  bca_100_khz_ra_impedance: number;
  ffm_trunk: number;
  bfm_percentage_right_leg: number;
  bfm_percentage_left_leg: number;
  bfm_right_leg: number;
  ffm_percentage_right_arm: number;
  bfm_percentage_trunk: number;
  systolic: number;
  inbody_score: number;
  bca_100_khz_la_impedance: number;
  ffm_right_arm: number;
  bfm_percentage_left_arm: number;
  ffm_percentage_left_leg: number;
  bfm_left_leg: number;
  diastolic: number;
  bfm_left_arm: number;
  ffm_percentage_right_leg: number;
  ffm_percentage_left_arm: number;
  skeletal_muscle_index: number;
  ffm_percentage_trunk: number;
  pulse_pressure: number;
  created_at: string;
  updated_at: string;
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