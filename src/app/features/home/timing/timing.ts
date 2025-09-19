import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/services/settings-service';
import { Subscription } from 'rxjs';
import { CLIENT_RENEG_LIMIT } from 'tls';

@Component({
  selector: 'app-timing',
  imports: [],
  templateUrl: './timing.html',
  styleUrl: './timing.scss',
})
export class Timing implements OnInit, OnDestroy {
  settingsService = inject(SettingsService);
  settings: any;
  subscriptions: Subscription = new Subscription();

  constructor() {}
  ngOnInit(): void {
    this.settings = this.settingsService.fetchSettings();
    this.subscriptions.add(
      this.settingsService.settings$.subscribe((settings) => {
        this.settings = settings;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  calculateTimingBlocks() {
    const { startAt, endAt, timeBlockDuration } = this.settings;

    const start = this.parseTime(startAt); // in minutes
    const end = this.parseTime(endAt); // in minutes
    const blocks: string[] = [];

    for (let time = start; time < end; time += timeBlockDuration) {
      blocks.push(this.formatTime(time));
    }

    return blocks;
  }
  private parseTime(time: string): number {
    console.log(time);
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private formatTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, '0');
    const minutes = (totalMinutes % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
