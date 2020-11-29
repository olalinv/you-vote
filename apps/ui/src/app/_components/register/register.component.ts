import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '../../_services';
import { IUser } from '@api-interfaces';

@Component({
  selector: 'you-vote-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private user: Partial<IUser> = {};
  form: FormGroup;
  loading = false;
  submitted = false;
  hidePassword = true;
  hidePasswordRepeat = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(8)]],
      yearBirth: [''],
      gender: [''],
      provinceResidence: [''],
      countryOrigin: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    console.log('form', this.form.value);

    this.loading = true;
    this.prepareUser(this.form.value);
    this.accountService
      .register(this.user)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful', {
            keepAfterRouteChange: true,
          });
          // this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }

  prepareUser = (values: object) => {
    delete values['passwordRepeat'];
    Object.assign(this.user, values);
  }
}
