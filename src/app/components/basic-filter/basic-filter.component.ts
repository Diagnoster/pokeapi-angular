import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-basic-filter',
  standalone: true,
  imports: [
    MatInputModule
  ],
  templateUrl: './basic-filter.component.html',
  styleUrl: './basic-filter.component.css'
})
export class BasicFilterComponent {
  @Input() label: string = 'Filter';
  @Input() placeholder: string = 'Enter filter text';
  @Output() filterChange = new EventEmitter<string>();

  onFilterChange(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    this.filterChange.emit(target.value);
  }
}
