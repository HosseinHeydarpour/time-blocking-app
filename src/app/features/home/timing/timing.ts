import {
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SettingsService } from '../../../core/services/settings-service';
import { Subscription } from 'rxjs';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { TaskService } from '../../../core/services/task-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timing',
  imports: [CommonModule],
  templateUrl: './timing.html',
  styleUrl: './timing.scss',
})
export class Timing implements OnInit, OnDestroy {
  settingsService = inject(SettingsService);
  settings: any;
  subscriptions: Subscription = new Subscription();
  taskService = inject(TaskService);
  tasks: any[] = [];

  @ViewChildren('listItem') listItems!: QueryList<ElementRef>;

  constructor() {
    effect(() => {
      this.tasks = this.taskService.tasks().map((task) => {
        const taskDuration = this.taskService.durationToMinutes(task.duration);
        return {
          task: task.title,
          duration: taskDuration,
        };
      });
      console.log(this.tasks);
      if (this.listItems) this.assignTasks();
    });
  }
  ngOnInit(): void {
    this.settings = this.settingsService.fetchSettings();
    this.subscriptions.add(
      this.settingsService.settings$.subscribe((settings) => {
        this.settings = settings;
        this.calculateTimingBlocks();
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

    for (let time = start; time <= end; time += Number(timeBlockDuration)) {
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

  assignTasks() {
    const takenBlocks: Set<number> = new Set(); // track used blocks

    console.log(this.listItems);
    this.listItems.forEach((item) => {
      item.nativeElement.classList.remove('taken');
      item.nativeElement.style.backgroundColor = '';
    });

    this.tasks.forEach((task) => {
      const blocksNeeded = Math.ceil(task.duration / this.settings.timeBlockDuration);

      let assigned = 0;
      let bgColor = this.getRandomColor();
      let textColor = this.getContrastTextColor(bgColor);
      this.listItems.forEach((item, index) => {
        if (assigned >= blocksNeeded) {
          bgColor = '';
          textColor = '';
          return;
        } // done for this task
        if (!takenBlocks.has(index)) {
          takenBlocks.add(index);
          assigned++;
          item.nativeElement.classList.add('taken');
          item.nativeElement.style.backgroundColor = bgColor;
          item.nativeElement.textContent = `${task.task} - ${task.duration} minutes`;
          item.nativeElement.style.color = `${textColor}`;
        }
      });
    });
  }

  getRandomColor() {
    const colors = [
      '#6366F1', // indigo-500
      '#8B5CF6', // violet-500
      '#EC4899', // pink-500
      '#14B8A6', // teal-500
      '#22C55E', // green-500
      '#3B82F6', // blue-500
      '#0EA5E9', // sky-500
      '#F59E0B', // amber-500
      '#EAB308', // yellow-500
      '#84CC16', // lime-500
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  getContrastTextColor(hex: string) {
    // Remove #
    hex = hex.replace('#', '');

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance (per W3C)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }
}
