import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ems-home',
  imports: [],
  templateUrl: './ems-home.html',
  styleUrl: './ems-home.css',
})
export class EmsHome {
  @Input({ required: true }) onLogout!: () => void;
  onLogoClick() {}
  onLogoutClick() { this.onLogout(); }
  onProfileClick() {}
  onMitarbeiterClick() {}
  onQualifikationenClick() {}
  onZuweisenClick() {}
}
