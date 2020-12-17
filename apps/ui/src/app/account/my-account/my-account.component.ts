import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ICountry, IGender, IRegion, IUser } from '@api-interfaces';
import {
  AccountService,
  CountryService,
  GenderService,
  RegionService,
  SharedService,
} from '@app/_services';
import { MustMatchValidator } from '@app/_validators/must-match.validator';

@Component({
  selector: 'you-vote-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  private user: IUser;
  form: FormGroup;
  loading = false;
  isSubmitted = false;
  hidePassword = true;
  hidePasswordRepeat = true;
  currentYear = new Date();
  genders: IGender[];
  countries: ICountry[];
  regions: IRegion[];

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private sharedService: SharedService,
    private genderService: GenderService,
    private countryService: CountryService,
    private regionService: RegionService
  ) {}

  // getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    // Subscriptions
    this.accountService.user.subscribe((user: IUser) => {
      this.user = user;
    });
    this.getGenders();
    this.getCountries();
    this.getRegions();
    this.initForm();
  }

  getGenders = () => {
    this.genderService.query().subscribe(
      (response: IGender[]) => {
        this.genders = response;
      },
      (error: string) => {}
    );
  };

  getCountries = () => {
    this.countryService.query().subscribe(
      (response: IGender[]) => {
        this.countries = response;
      },
      (error: string) => {}
    );
  };

  getRegions = () => {
    this.regionService.query().subscribe(
      (response: IRegion[]) => {
        this.regions = response;
      },
      (error: string) => {}
    );
  };

  initForm() {
    this.form = this.formBuilder.group(
      {
        username: [this.user.username, Validators.required],
        email: [this.user.email, Validators.required],
        password: [
          this.user.password,
          [Validators.required, Validators.minLength(8)],
        ],
        passwordRepeat: [
          this.user.password,
          [Validators.required, Validators.minLength(8)],
        ],
        yearBirth: [this.user.yearBirth],
        gender: [this.user.gender],
        provinceResidence: [this.user.provinceResidence],
        countryOrigin: [this.user.countryOrigin],
      },
      {
        validators: [MustMatchValidator('password', 'passwordRepeat')],
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .update(this.user._id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.sharedService.openSnackBar(
            'Tu cuenta se ha guardado correctamente'
          );
          this.loading = false;
        },
        error: (error) => {
          this.sharedService.openSnackBar(error);
          this.loading = false;
        },
      });
  }
}
