

import { Component, signal } from '@angular/core';
import { EmsHome } from './ems-home/ems-home';
import { LoginComponent } from './login/login';

@Component({
  selector: 'app-root',
  imports: [EmsHome, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ems-hitec');
  protected readonly isLoggedIn = signal(false);

  onLogin = () => {
    this.isLoggedIn.set(true);
  };

  onLogout = () => {
    this.isLoggedIn.set(false);
  };
}
