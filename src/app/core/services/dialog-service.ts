import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

export type DialogType = 'task' | 'settings' | 'delete';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  // Convert the signal to an Observable
  visible$ = new Subject<{ isVisible: boolean; type: DialogType | null }>();

  openDialog(type: DialogType) {
    this.visible$.next({ isVisible: true, type });
  }

  closeDialog() {
    this.visible$.next({ isVisible: false, type: null });
  }
}
