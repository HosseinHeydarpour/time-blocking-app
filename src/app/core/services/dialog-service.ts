import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  visible = signal(false);

  openDialog() {
    this.visible.set(true);
  }

  closeDialog() {
    this.visible.set(false);
  }
}
