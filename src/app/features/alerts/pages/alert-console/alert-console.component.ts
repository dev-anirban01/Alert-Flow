import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AlertService } from '../../services/alert.service';
import { AlertSeverity, AlertSource, AlertStatus } from '../../models/alert.model';

@Component({
  selector: 'app-alert-console',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './alert-console.component.html',
  styleUrl: './alert-console.component.scss',
})
export class AlertConsoleComponent {
  private readonly alertService = inject(AlertService);

  readonly alerts = this.alertService.alerts;

  readonly severities: AlertSeverity[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  readonly statuses: AlertStatus[] = ['OPEN', 'ESCALATED', 'AUTO_CLOSED', 'RESOLVED'];

  readonly sources: AlertSource[] = ['tracking-svc', 'billing-svc', 'auth-svc'];

  readonly searchTerm = signal('');
  readonly selectedSeverity = signal('');
  readonly selectedStatus = signal('');
  readonly selectedSource = signal('');

  readonly selectedAlertId = signal<string | null>('AL-001');
  readonly currentPage = signal(1);
  readonly pageSize = 10;

  readonly isDetailsOpen = signal(false);
  readonly resolveNote = signal('');
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');

  readonly totalCount = computed(() => this.alerts().length);

  readonly openCount = computed(
    () => this.alerts().filter((alert) => alert.status === 'OPEN').length,
  );

  readonly escalatedCount = computed(
    () => this.alerts().filter((alert) => alert.status === 'ESCALATED').length,
  );

  readonly resolvedCount = computed(
    () =>
      this.alerts().filter((alert) => alert.status === 'RESOLVED' || alert.status === 'AUTO_CLOSED')
        .length,
  );

  private normalizeSearch(value: unknown): string {
    return String(value ?? '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ');
  }

  readonly filteredAlerts = computed(() => {
    const search = this.normalizeSearch(this.searchTerm());
    const searchWords = search.split(' ').filter(Boolean);

    const severity = this.selectedSeverity();
    const status = this.selectedStatus();
    const source = this.selectedSource();

    return this.alerts()
      .filter((alert) => {
        // Collect all searchable alert fields.
        const searchableFields: unknown[] = [
          alert.id,
          alert.source,
          alert.severity,
          alert.status,
          alert.createdAt,
          ...(alert.history ?? []).flatMap((entry) => [
            entry.state,
            entry.ts,
            entry.note,
            entry.description,
            entry.action,
            entry.performedBy,
            entry.timestamp,
          ]),
        ];

        // Search in all fields, not only the alert ID.
        const searchableText = searchableFields
          .map((value) => this.normalizeSearch(value))
          .filter(Boolean)
          .join(' ');

        // Every search word must match somewhere in the alert.
        const matchesSearch =
          searchWords.length === 0 || searchWords.every((word) => searchableText.includes(word));

        // Existing filters continue to work together.
        const matchesSeverity = !severity || alert.severity === severity;

        const matchesStatus = !status || alert.status === status;

        const matchesSource = !source || alert.source === source;

        return matchesSearch && matchesSeverity && matchesStatus && matchesSource;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredAlerts().length / this.pageSize)),
  );

  readonly pageAlerts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;

    return this.filteredAlerts().slice(start, start + this.pageSize);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1),
  );

  readonly firstResult = computed(() =>
    this.filteredAlerts().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1,
  );

  readonly lastResult = computed(() =>
    Math.min(this.currentPage() * this.pageSize, this.filteredAlerts().length),
  );

  readonly selectedAlert = computed(() => {
    const selectedId = this.selectedAlertId();
    const matchingAlert = this.filteredAlerts().find((alert) => alert.id === selectedId);

    return matchingAlert ?? this.pageAlerts()[0] ?? null;
  });

  readonly canResolve = computed(() => {
    const status = this.selectedAlert()?.status;

    return status === 'OPEN' || status === 'ESCALATED';
  });

  readonly hasFilters = computed(
    () =>
      !!(
        this.searchTerm() ||
        this.selectedSeverity() ||
        this.selectedStatus() ||
        this.selectedSource()
      ),
  );

  updateSearch(value: string): void {
    this.searchTerm.set(value);
    this.resetView();
  }

  updateSeverity(value: string): void {
    this.selectedSeverity.set(value);
    this.resetView();
  }

  updateStatus(value: string): void {
    this.selectedStatus.set(value);
    this.resetView();
  }

  updateSource(value: string): void {
    this.selectedSource.set(value);
    this.resetView();
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedSeverity.set('');
    this.selectedStatus.set('');
    this.selectedSource.set('');
    this.resetView();
  }

  private resetView(): void {
    this.currentPage.set(1);
    this.selectedAlertId.set(null);
    this.clearMessages();
  }

  selectAlert(id: string): void {
    this.selectedAlertId.set(id);
    this.resolveNote.set('');
    this.clearMessages();
    this.isDetailsOpen.set(true);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.currentPage.set(page);
    this.selectedAlertId.set(null);
    this.resolveNote.set('');
    this.clearMessages();
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  closeDetails(): void {
    this.isDetailsOpen.set(false);
  }

  updateNote(value: string): void {
    this.resolveNote.set(value);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  private clearMessages(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  async resolveAlert(): Promise<void> {
    const alert = this.selectedAlert();
    const note = this.resolveNote().trim();

    this.clearMessages();

    if (!alert) return;

    if (!note) {
      this.errorMessage.set('Please enter a resolution note.');
      return;
    }

    if (!this.canResolve()) {
      this.errorMessage.set('This alert cannot be resolved.');
      return;
    }

    if (this.isSaving()) return;

    this.isSaving.set(true);

    try {
      await this.alertService.resolveAlert({
        id: alert.id,
        note,
      });

      this.resolveNote.set('');
      this.successMessage.set('Alert resolved successfully.');
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'Unable to resolve this alert.',
      );
    } finally {
      this.isSaving.set(false);
    }
  }
}
