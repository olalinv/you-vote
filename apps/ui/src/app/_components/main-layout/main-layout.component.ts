import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from '@api-interfaces';
import { AccountService, SharedService } from '@app/_services';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'you-vote-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  user: IUser;
  currentDate: Date = new Date();
  dialogRef: MatDialogRef<any, any>;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    // Subscriptions
    this.accountService.user.subscribe((user: IUser) => {
      this.user = user;
    });
    this.sharedService.dialog$.subscribe((component: string) => {
      if (component) {
        this.openDialog(component);
      }
    });
    this.sharedService.snackBar$.subscribe((message: string) => {
      if (message) {
        this.openSnackBar(message);
      }
    });
  }

  logOut(): void {
    this.accountService.logout();
    this.openSnackBar('Cerraste sesión');
  }

  openDialog(component: string) {
    switch (component) {
      case 'login':
        this.dialogRef = this.dialog.open(LoginComponent);
        break;
      case 'register':
        this.dialogRef = this.dialog.open(RegisterComponent, {
          width: '800px',
        });
        break;
    }
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result && typeof result === 'string') {
        this.openDialog(result);
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
    });
  }
}
