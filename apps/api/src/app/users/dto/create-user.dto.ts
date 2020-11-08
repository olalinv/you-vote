export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly yearBirth: number;
  readonly gender: string;
  readonly provinceResidence: string;
  readonly countryOrigin: string;
}
