
import { Component, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Alert, ResolveAlertRequest } from '../../models/alert.model';
import { AlertTimelineComponent } from '../alert-timeline/alert-timeline.component';

@Component({
  selector: 'app-alert-details',
  standalone: true,
  imports: [DatePipe, AlertTimelineComponent],
  templateUrl: './alert-details.component.html',
  styleUrl: './alert-details.component.scss'
})
export class AlertDetailsComponent {
  readonly alert = input.required<Alert>();
  readonly isResolving = input(false);
  readonly resolve = output<ResolveAlertRequest>();

  readonly resolutionNote = signal('');
  readonly validationMessage = signal('');

  get canResolve(): boolean {
    return this.alert().status === 'OPEN' ||
      this.alert().status === 'ESCALATED';
  }

  submitResolution(): void {
    const note = this.resolutionNote().trim();

    if (!note) {
      this.validationMessage.set('Please enter a resolution note.');
      return;
    }

    this.validationMessage.set('');
    this.resolve.emit({
      alertId: this.alert().id,
      note
    });
  }
}
