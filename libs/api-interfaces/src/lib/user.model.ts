export interface IUser {
  email: string;
  readonly _id: string;
  password: string;
  readonly token: string;
  username: string;
  // Profile
  countryOrigin: number;
  gender: number;
  provinceResidence: number;
  yearBirth: number;
}
