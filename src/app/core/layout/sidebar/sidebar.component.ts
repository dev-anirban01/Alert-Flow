
import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly isOpen = input<boolean>(false);
  readonly isCollapsed = input<boolean>(false);

  readonly closeSidebar = output<void>();
  readonly toggleCollapsed = output<void>();

  onNavigationClick(): void {
    this.closeSidebar.emit();
  }

  onToggleCollapsed(): void {
    this.toggleCollapsed.emit();
  }
}
