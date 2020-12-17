import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { MustMatchValidator } from '../../_validators/must-match.validator';
import { ICountry, IGender, IRegion, IUser } from '@api-interfaces';
import { AccountService, CountryService, GenderService, RegionService, SharedService } from '@app/_services';

@Component({
  selector: 'you-vote-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private user: Partial<IUser> = {};
  form: FormGroup;
  loading = false;
  isSubmitted = false;
  hidePassword = true;
  hidePasswordRepeat = true;
  currentYear = new Date();
  genders: IGender[];
  countries: ICountry[];
  regions: IRegion[];

  get f() {
    return this.form.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private accountService: AccountService,
    private sharedService: SharedService,
    private genderService: GenderService,
    private countryService: CountryService,
    private regionService: RegionService
  ) {}

  ngOnInit() {
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
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordRepeat: ['', [Validators.required, Validators.minLength(8)]],
        yearBirth: [null],
        gender: [null],
        provinceResidence: [null],
        countryOrigin: [null],
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
    this.prepareUser(this.form.value);
    this.accountService
      .register(this.user)
      .pipe(first())
      .subscribe({
        next: () => {
          this.dialogRef.close('login');
          this.sharedService.openSnackBar(
            'Tu cuenta se ha creado. Inicia sesión'
          );
        },
        error: (error) => {
          this.sharedService.openSnackBar(error);
          this.loading = false;
        },
      });
  }

  prepareUser = (values: object) => {
    delete values['passwordRepeat'];
    Object.assign(this.user, values);
  };
}
