import { Component, input, output } from '@angular/core';
import { LucideAngularModule, XIcon } from 'lucide-angular';

@Component({
  selector: 'app-modal',
  imports: [LucideAngularModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  readonly XIcon = XIcon;

  isOpen = input.required<boolean>();
  title = input.required<string>();

  close = output<void>();


  onOverlayClick() {
    this.close.emit()
  }

}
