import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'you-vote-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  user: User;
  currentDate: Date = new Date();

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {}

  openDialog(component: string) {
    let dialogRef: MatDialogRef<any, any>;
    switch (component) {
      case 'login':
        dialogRef = this.dialog.open(LoginComponent);
        break;
      case 'register':
        dialogRef = this.dialog.open(RegisterComponent, {
          width: '800px',
        });
        break;
    }
    dialogRef.afterClosed().subscribe((result) => {
      if (result && typeof result === 'string') {
        this.openDialog(result);
      }
    });
  }
}
