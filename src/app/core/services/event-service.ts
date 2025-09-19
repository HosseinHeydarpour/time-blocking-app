import { Injectable, signal } from '@angular/core';
import { ITask } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  events = signal<ITask[]>([]);

  addEvent(event: ITask) {
    this.events.update((events) => [...events, event]);
  }

  deleteEvent(event: ITask) {
    this.events.update((events) => events.filter((e) => e.id !== event.id));
  }
}
