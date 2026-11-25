import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly isDarkMode = signal<boolean>(false);

  toggleTheme(): void {
    this.isDarkMode.update((dark) => !dark);
  }
}
