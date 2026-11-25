import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  readonly isSidebarOpen = signal(false);
  readonly isSidebarCollapsed = signal(false);

  private readonly mobileBreakpoint = 768;
  private readonly compactBreakpoint = 1100;

  private userChangedSidebar = false;

  ngOnInit(): void {
    this.updateSidebarForScreenSize();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateSidebarForScreenSize();
  }

  private updateSidebarForScreenSize(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const screenWidth = window.innerWidth;

    // Mobile: use the drawer. The collapsed state is not relevant here.
    if (screenWidth <= this.mobileBreakpoint) {
      this.isSidebarOpen.set(false);
      return;
    }

    // Tablet and smaller laptop: automatically collapse the sidebar.
    if (screenWidth <= this.compactBreakpoint) {
      if (!this.userChangedSidebar) {
        this.isSidebarCollapsed.set(true);
      }

      return;
    }

    // Large desktop: show the expanded sidebar by default.
    this.isSidebarCollapsed.set(false);
    this.userChangedSidebar = false;
  }

  openSidebar(): void {
    this.isSidebarOpen.set(true);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  toggleSidebarCollapsed(): void {
    this.userChangedSidebar = true;

    this.isSidebarCollapsed.update((value) => !value);
  }
}
