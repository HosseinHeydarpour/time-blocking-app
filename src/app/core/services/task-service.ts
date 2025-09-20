import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { ITask } from '../models/task.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<ITask[]>([]);
  platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('tasks');
      if (saved) {
        this.tasks.set(JSON.parse(saved));
      }
    }
  }
  addTask(task: ITask) {
    this.tasks.update((tasks) => [...tasks, task]);
    this.persistTasks();
  }

  deleteTask(task: ITask) {
    this.tasks.update((tasks) => tasks.filter((t) => t.id !== task.id));
    this.persistTasks();
  }

  durationToMinutes(duration: Date): number {
    let time = duration;
    if (typeof duration === 'string') time = new Date(duration);
    return time.getHours() * 60 + time.getMinutes();
  }

  persistTasks() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    }
  }
}
