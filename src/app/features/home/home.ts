import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { EventService } from '../../core/services/event-service';
import { DialogService } from '../../core/services/dialog-service';
import { TaskDialog } from '../../shared/components/task-dialog/task-dialog';
import { ThemeService } from '../../core/services/theme-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TaskDialog],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  today = new Date();
  eventService = inject(EventService);
  dialogService = inject(DialogService);
  themeService = inject(ThemeService);
  isNightMode = computed(() => this.themeService.theme() === 'dark');

  eventsList = computed(() => this.eventService.events());

  constructor() {}

  showTaskDialog() {
    this.dialogService.openDialog();
  }
}
