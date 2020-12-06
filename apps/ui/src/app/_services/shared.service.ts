import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private dialog = new BehaviorSubject('');
  dialog$ = this.dialog.asObservable();

  constructor() {}

  openDialog(component: string) {
    if (component) {
      this.dialog.next(component);
    }
  }
}
