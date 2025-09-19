import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNav } from './layout/mobile-nav/mobile-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MobileNav],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('time-blocking');
}
