import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { EventService } from '../../core/services/event-service';
import { DialogService } from '../../core/services/dialog-service';
import { TaskDialog } from '../../shared/components/task-dialog/task-dialog';

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

  eventsList = computed(() => this.eventService.events());

  constructor() {}

  showTaskDialog() {
    this.dialogService.openDialog();
  }
}
