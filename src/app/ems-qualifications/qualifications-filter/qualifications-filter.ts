import { Component, inject } from '@angular/core';
import { QualificationsStore } from '../qualifications-store';

@Component({
  selector: 'app-qualifications-filter',
  imports: [],
  templateUrl: './qualifications-filter.html',
  styleUrl: './qualifications-filter.css',
})
export class QualificationsFilter {
  private readonly store = inject(QualificationsStore);

  filterText = this.store.filterText;

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.store.setFilter(input.value);
  }

  onClearFilter(): void {
    this.store.clearFilter();
  }
}
