import { Component, inject } from '@angular/core';
import { QualificationsStore } from '../qualifications-store';
import { LucideAngularModule, SearchIcon, XIcon } from 'lucide-angular';

@Component({
  selector: 'app-qualifications-filter',
  imports: [LucideAngularModule],
  templateUrl: './qualifications-filter.html',
  styleUrl: './qualifications-filter.css',
})
export class QualificationsFilter {
  readonly SearchIcon = SearchIcon;
  readonly XIcon = XIcon;

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
