import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  isOpen = input.required<boolean>();
  title = input.required<string>();

  close = output<void>();


  onOverlayClick() {
    this.close.emit()
  }

}
