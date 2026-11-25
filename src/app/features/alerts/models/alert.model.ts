
export type AlertSeverity =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL';

export type AlertStatus =
  | 'OPEN'
  | 'ESCALATED'
  | 'AUTO_CLOSED'
  | 'RESOLVED';

export type AlertSource =
  | 'tracking-svc'
  | 'billing-svc'
  | 'auth-svc';

export interface AlertHistory {
  // New compact timeline fields
  state: AlertStatus;
  ts: string;
  note?: string;

  // Compatibility fields used by the existing timeline component
  id?: string;
  action?: string;
  timestamp?: string;
  description?: string;
  performedBy?: string;
}

export interface Alert {
  id: string;
  source: AlertSource;
  severity: AlertSeverity;
  status: AlertStatus;
  createdAt: string;
  history: AlertHistory[];

  // Fields used by the existing details component
  title: string;
  description: string;
  updatedAt: string;
}

export interface ResolveAlertRequest {
  // Both names are supported for existing and new components
  id?: string;
  alertId?: string;
  note: string;
}
