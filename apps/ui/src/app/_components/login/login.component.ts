import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AccountService, SharedService } from '../../_services';

@Component({
  selector: 'you-vote-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  isSubmitted = false;
  hidePassword = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    private accountService: AccountService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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

    this.isLoading = true;
    this.accountService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.sharedService.openSnackBar('Iniciaste sesión correctamente');
          this.reload();
        },
        error: (error) => {
          this.sharedService.openSnackBar(error);
          this.isLoading = false;
        },
      });
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }
}
