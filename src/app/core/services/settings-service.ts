import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // Convert the signal to an Observable

  private platformId = inject(PLATFORM_ID);
  settings$ = new Subject<any>();

  saveSettings(settings: any) {
    // Save settings logic here
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('settings', JSON.stringify(settings));
      this.settings$.next(settings);
    }
  }

  fetchSettings() {
    if (isPlatformBrowser(this.platformId)) {
      const settings = localStorage.getItem('settings');
      return settings
        ? JSON.parse(settings)
        : { focusDurationGoal: 8, timeBlockDuration: 5, startAt: '7:00', endAt: '22:00' };
    }

    // fallback for SSR or non-browser platforms
    return { focusDurationGoal: 8, timeBlockDuration: 5, startAt: '7:00', endAt: '22:00' };
  }
}
