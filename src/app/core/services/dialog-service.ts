import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  // Convert the signal to an Observable
  visible$ = new Subject<boolean>();

  openDialog() {
    this.visible$.next(true);
  }

  closeDialog() {
    this.visible$.next(false);
  }
}
