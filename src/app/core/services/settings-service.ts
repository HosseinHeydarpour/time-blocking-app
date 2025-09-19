import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // Convert the signal to an Observable

  private platformId = inject(PLATFORM_ID);

  saveSettings(settings: any) {
    // Save settings logic here
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('settings', JSON.stringify(settings));
    }
  }

  fetchSettings() {
    if (isPlatformBrowser(this.platformId)) {
      const settings = localStorage.getItem('settings');
      return settings ? JSON.parse(settings) : null;
    }
  }
}
