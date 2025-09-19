import { Injectable, signal } from '@angular/core';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<ITask[]>([]);

  addEvent(task: ITask) {
    this.tasks.update((tasks) => [...tasks, task]);
  }

  deleteEvent(task: ITask) {
    this.tasks.update((tasks) => tasks.filter((t) => t.id !== task.id));
  }
}
