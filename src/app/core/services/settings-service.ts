import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // Convert the signal to an Observable
  visible$ = new Subject<boolean>();

  openDialog() {
    this.visible$.next(true);
  }

  closeDialog() {
    this.visible$.next(false);
  }
}
