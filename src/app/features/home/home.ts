import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { TaskService } from '../../core/services/task-service';
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
  taskService = inject(TaskService);
  dialogService = inject(DialogService);
  themeService = inject(ThemeService);
  isNightMode = computed(() => this.themeService.theme() === 'dark');

  tasksList = computed(() => this.taskService.tasks());

  constructor() {}

  showTaskDialog() {
    this.dialogService.openDialog();
  }
}
