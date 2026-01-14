import { Component, Input, signal, WritableSignal } from '@angular/core';
import { EmsQualifications } from "../ems-qualifications/ems-qualifications";

@Component({
  selector: 'app-ems-home',
  imports: [EmsQualifications],
  templateUrl: './ems-home.html',
  styleUrl: './ems-home.css',
})
export class EmsHome {
  selectedScreen: WritableSignal<string> = signal<string>('home');
  @Input({ required: true }) onLogout!: () => void;
  onLogoClick() {}
  onLogoutClick() { this.onLogout(); }
  onProfileClick() {}
  onMitarbeiterClick() {}
  onQualificationsClick() {this.selectedScreen.set('qualifications');}
  onZuweisenClick() {}
    get currentYear(): number {
      return new Date().getFullYear();
    }
}
