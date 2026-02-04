import { Component, inject } from '@angular/core';
import { Auth } from '../auth/auth';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ems-home',
  imports: [RouterOutlet],
  templateUrl: './ems-home.html',
  styleUrl: './ems-home.css',
})
export class EmsHome {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  onLogoClick() {this.router.navigateByUrl('/home')}
  onLogoutClick() {this.auth.logout()}
  onProfileClick() {}
  onMitarbeiterClick() {this.router.navigateByUrl('/employees')}
  onQualificationsClick() {this.router.navigateByUrl('/qualifications')}
  onZuweisenClick() {this.router.navigateByUrl('/assign-qualifications')}

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
