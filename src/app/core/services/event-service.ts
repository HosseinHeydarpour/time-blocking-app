import { Injectable, signal } from '@angular/core';
import { IEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  events = signal<IEvent[]>([]);

  addEvent(event: IEvent) {
    this.events.update((events) => [...events, event]);
  }

  deleteEvent(event: IEvent) {
    this.events.update((events) => events.filter((e) => e.id !== event.id));
  }
}
