import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    public dialog: MatDialog,
    private accountService: AccountService,
    private sharedService: SharedService
  ) {
    this.user = this.accountService.userValue;
    console.log(this.user);
  }

  ngOnInit(): void {
    // Subscriptions
    this.sharedService.dialog$.subscribe((component: string) => {
      if (component) {
        this.openDialog(component);
      }
    });
  }

  logOut(): void {
    this.accountService.logout();
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
}
