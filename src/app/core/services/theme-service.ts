import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = signal<'light' | 'dark'>('light');
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        this.theme.set(savedTheme);
      }
      this.applyTheme(this.theme());
    }
  }

  changeTheme(theme: 'light' | 'dark') {
    this.theme.set(theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    }
  }

  toggleDarkMode() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.changeTheme(newTheme);
  }

  private applyTheme(theme: 'light' | 'dark') {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }
}
