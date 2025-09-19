import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { EventService } from '../../core/services/event-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  today = new Date();
  eventService = inject(EventService);

  eventsList = computed(() => this.eventService.events());

  constructor() {}
}
