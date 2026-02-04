import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../auth/auth';
import { Router } from '@angular/router';

//TODO: error messages (Docker down, Authentik, etc.)
@Component({
  selector: 'ems-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(Auth);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  usernameLogin = signal(false);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  private _errorTimeout: any;

  private setError(message: string): void {
    this.errorMessage.set(message);
    if (this._errorTimeout) {
      clearTimeout(this._errorTimeout);
    }
    this._errorTimeout = setTimeout(() => {
      this.errorMessage.set(null);
      this._errorTimeout = null;
    }, 5000);
  }

  onSignIn(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    // Use the simplified password 'secret' defined in the blueprint
    this.authService.createToken('john', 'secret').subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error('Login error', err);
        this.isLoading.set(false);
        this.setError('SSO Login fehlgeschlagen. Bitte prüfen Sie Ihre Verbindung.');
      },
    });
  }

  onUserSignIn(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.createToken(username!, password!).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error('Login error', err);
        this.isLoading.set(false);
        this.setError('Login fehlgeschlagen. Bitte prüfen Sie Benutzername und Passwort.');
      },
    });
  }

  onClearError(): void {
    this.errorMessage.set(null);
  }
}
