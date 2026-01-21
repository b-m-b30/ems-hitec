import { Component, Input, signal, WritableSignal } from '@angular/core';
import { EmsQualifications } from "../ems-qualifications/ems-qualifications";
import {EmsEmployees} from '../ems-employees/ems-employees';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-ems-home',
  imports: [EmsQualifications, EmsEmployees, NgOptimizedImage],
  templateUrl: './ems-home.html',
  styleUrl: './ems-home.css',
})
export class EmsHome {
  selectedScreen: WritableSignal<string> = signal<string>('home');
  @Input({ required: true }) onLogout!: () => void;

  onLogoClick() {}
  onLogoutClick() {
    this.onLogout();
    localStorage.setItem('access_token', '');
  }
  onProfileClick() {}
  onMitarbeiterClick() {this.selectedScreen.set('employees');}
  onQualificationsClick() {this.selectedScreen.set('qualifications');}
  onZuweisenClick() {}

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
