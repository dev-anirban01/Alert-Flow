import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-alert-table',
  imports: [BadgeComponent],
  templateUrl: './alert-table.component.html',
  styleUrl: './alert-table.component.scss'
})
export class AlertTableComponent {
  // @Input() alerts: AlertItem[] = [];
  // @Input() selectedAlertId: string | null = null;
  // @Output() alertSelected = new EventEmitter<AlertItem>();
}
