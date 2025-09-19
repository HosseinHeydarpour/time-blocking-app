import { Component, inject, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/services/settings-service';

@Component({
  selector: 'app-timing',
  imports: [],
  templateUrl: './timing.html',
  styleUrl: './timing.scss',
})
export class Timing implements OnInit {
  settingsService = inject(SettingsService);
  settings: any;

  constructor() {}
  ngOnInit(): void {
    this.settings = this.settingsService.fetchSettings();
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
