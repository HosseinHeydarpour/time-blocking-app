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
}
