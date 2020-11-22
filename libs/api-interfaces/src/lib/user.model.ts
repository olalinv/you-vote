export interface IUser {
  email: string;
  readonly _id: string;
  password: string;
  readonly token: string;
  username: string;
  // Profile
  countryOrigin: string;
  gender: string;
  provinceResidence: string;
  yearBirth: number;
}
