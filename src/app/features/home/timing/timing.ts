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
    console.log('ASSIGN CALLED');
    const takenBlocks: Set<number> = new Set(); // track used blocks

    console.log(this.listItems);
    this.listItems.forEach((item) => {
      item.nativeElement.classList.remove('taken');
      item.nativeElement.style.backgroundColor = '';
    });

    this.tasks.forEach((task) => {
      const blocksNeeded = Math.ceil(task.duration / this.settings.timeBlockDuration);

      let assigned = 0;
      this.listItems.forEach((item, index) => {
        if (assigned >= blocksNeeded) return; // done for this task
        if (!takenBlocks.has(index)) {
          takenBlocks.add(index);
          assigned++;
          item.nativeElement.classList.add('taken');
          item.nativeElement.style.backgroundColor = this.getRandomColor();
          item.nativeElement.textContent = `${task.task} - ${task.duration} minutes`;
        }
      });
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
