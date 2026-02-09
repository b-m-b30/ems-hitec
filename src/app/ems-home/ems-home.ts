import { Component, inject } from '@angular/core';
import { Auth } from '../auth/auth';
import { Router, RouterOutlet } from '@angular/router';
import { LucideAngularModule, UserIcon, LogOutIcon, GraduationCapIcon, PencilIcon, DiamondIcon } from 'lucide-angular';

@Component({
  selector: 'app-ems-home',
  imports: [
    RouterOutlet,
    LucideAngularModule
  ],
  templateUrl: './ems-home.html',
  styleUrl: './ems-home.css',
})
export class EmsHome {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly UserIcon = UserIcon;
  readonly LogOutIcon = LogOutIcon;
  readonly GraduationCapIcon = GraduationCapIcon;
  readonly PencilIcon = PencilIcon;
  readonly DiamondIcon = DiamondIcon;
  
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
