import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // MatDialog shared
  private dialog = new BehaviorSubject('');
  dialog$ = this.dialog.asObservable();
  // MatSnackBar shared
  private snackBar = new BehaviorSubject('');
  snackBar$ = this.snackBar.asObservable();

  constructor() {}

  openDialog(component: string) {
    if (component) {
      this.dialog.next(component);
    }
  }

  openSnackBar(message: string) {
    if (message) {
      this.snackBar.next(message);
    }
  }
}
