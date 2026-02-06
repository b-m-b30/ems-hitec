import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { Auth } from '../auth/auth';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ems-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);

  usernameLogin = signal(false);

  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  username = signal('');
  password = signal('');

  usernameValid = computed(() => this.username().trim().length > 0);
  passwordValid = computed(() => this.password().trim().length > 0);
  formValid = computed(() => this.usernameValid() && this.passwordValid());

  onSignIn(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.authService.createToken(environment.login.username, environment.login.password).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error('Login error', err);
        this.isLoading.set(false);
        this.errorMessage.set('SSO Login fehlgeschlagen. Bitte prüfen Sie Ihre Verbindung.');
      },
    });
  }

  onUserSignIn(): void {
    if (!this.formValid()) {
      return;
    }
    const username = this.username();
    const password = this.password();
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.authService.createToken(username, password).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error('Login error', err);
        this.isLoading.set(false);
        this.errorMessage.set('Login fehlgeschlagen. Bitte prüfen Sie Benutzername und Passwort.');
      },
    });
  }

  clearError(): void {
    this.errorMessage.set(null);
  }
}
