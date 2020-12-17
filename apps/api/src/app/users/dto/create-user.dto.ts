export class CreateUserDto {
  // Required
  readonly email: string;
  readonly password: string;
  readonly username: string;
  // Optional
  readonly countryOrigin: number;
  readonly gender: number;
  readonly provinceResidence: number;
  readonly yearBirth: number;
}
