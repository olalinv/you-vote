export class CreateUserDto {
  // Required
  readonly email: string;
  readonly password: string;
  readonly username: string;
  // Optional
  readonly countryOrigin: string;
  readonly gender: string;
  readonly provinceResidence: string;
  readonly yearBirth: number;
}
