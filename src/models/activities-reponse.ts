export interface IClassOption {
  label: string;
  value: string;
  type: string;
}

export interface IClass {
  title: string;
  options: IClassOption[];
}

export interface ICenterOption {
  label: string;
  value: string;
  type: string;
}

export interface ICenter {
  label: string;
  weight: number;
  options: ICenterOption[];
}

export interface IActivitiesResponse {
  classes: IClass;
  centers: ICenter;
}
