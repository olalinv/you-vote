import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { MustMatchValidator } from '../../_validators/must-match.validator';
import { IUser } from '@api-interfaces';
import { AccountService, SharedService } from '@app/_services';

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

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private accountService: AccountService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordRepeat: ['', [Validators.required, Validators.minLength(8)]],
        yearBirth: [''],
        gender: [''],
        provinceResidence: [''],
        countryOrigin: [''],
      },
      {
        validators: [MustMatchValidator('password', 'passwordRepeat')],
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

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
