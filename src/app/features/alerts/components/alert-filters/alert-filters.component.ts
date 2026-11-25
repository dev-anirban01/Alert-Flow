import { Component, EventEmitter, Output } from '@angular/core';
import { SearchInputComponent } from '../../../../shared/components/search-input/search-input.component';

@Component({
  selector: 'app-alert-filters',
  imports: [SearchInputComponent],
  templateUrl: './alert-filters.component.html',
  styleUrl: './alert-filters.component.scss'
})
export class AlertFiltersComponent {
  // @Output() filterChanged = new EventEmitter<Partial<AlertFilterCriteria>>();

  // onSearchChange(searchQuery: string): void {
  //   this.filterChanged.emit({ searchQuery });
  // }

  // onSeverityChange(event: Event): void {
  //   const value = (event.target as HTMLSelectElement).value as AlertSeverity | 'all';
  //   this.filterChanged.emit({ severity: value });
  // }

  // onStatusChange(event: Event): void {
  //   const value = (event.target as HTMLSelectElement).value as AlertStatus | 'all';
  //   this.filterChanged.emit({ status: value });
  // }
}
