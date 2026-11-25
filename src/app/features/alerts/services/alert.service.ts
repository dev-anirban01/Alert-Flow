
import { Injectable, signal } from '@angular/core';

import {
  Alert,
  AlertHistory,
  ResolveAlertRequest
} from '../models/alert.model';

import { createMockAlerts } from '../data/alert.mock-data';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly alertState = signal<Alert[]>(
    createMockAlerts()
  );

  readonly alerts = this.alertState.asReadonly();

  async resolveAlert(
    request: ResolveAlertRequest
  ): Promise<void> {
    const alertId = request.id ?? request.alertId;
    const note = request.note.trim();

    if (!alertId) {
      throw new Error('Alert ID is required.');
    }

    if (!note) {
      throw new Error('Please enter a resolution note.');
    }

    const alert = this.alertState().find(
      item => item.id === alertId
    );

    if (!alert) {
      throw new Error('Alert not found.');
    }

    if (
      alert.status !== 'OPEN' &&
      alert.status !== 'ESCALATED'
    ) {
      throw new Error('This alert cannot be resolved.');
    }

    // Simulate an 800 ms server request.
    await new Promise<void>(resolve => {
      setTimeout(resolve, 800);
    });

    const latestAlert = this.alertState().find(
      item => item.id === alertId
    );

    if (
      !latestAlert ||
      (
        latestAlert.status !== 'OPEN' &&
        latestAlert.status !== 'ESCALATED'
      )
    ) {
      throw new Error('This alert has already been updated.');
    }

    const resolvedAt = new Date().toISOString();

    const historyEntry: AlertHistory = {
      id: `${alertId}-H-${Date.now()}`,
      state: 'RESOLVED',
      action: 'Alert resolved',
      ts: resolvedAt,
      timestamp: resolvedAt,
      note,
      description: note,
      performedBy: 'Admin User'
    };

    this.alertState.update(alerts =>
      alerts.map(item =>
        item.id === alertId
          ? {
              ...item,
              status: 'RESOLVED',
              updatedAt: resolvedAt,
              history: [
                ...item.history,
                historyEntry
              ]
            }
          : item
      )
    );
  }
}
