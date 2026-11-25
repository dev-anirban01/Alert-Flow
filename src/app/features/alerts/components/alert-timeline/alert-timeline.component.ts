
import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AlertHistory } from '../../models/alert.model';

@Component({
  selector: 'app-alert-timeline',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './alert-timeline.component.html',
  styleUrl: './alert-timeline.component.scss'
})
export class AlertTimelineComponent {
  readonly history = input.required<AlertHistory[]>();
}
