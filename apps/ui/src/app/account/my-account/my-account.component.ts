import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IUser } from '@api-interfaces';
import { AccountService } from '@app/_services';

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

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {
    this.user = this.accountService.userValue;
  }

  // getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
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
    });
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
          // this.alertService.success('Update successful', {
          //   keepAfterRouteChange: true,
          // });
          // this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (error) => {
          // this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
