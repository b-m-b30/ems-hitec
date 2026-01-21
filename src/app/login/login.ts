
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

  onSignIn(): void {
    this.isLoading.set(true);
    this.authService.createToken('john', 'ZIKP24RzyA6ENvbpqVPc3W5RRQFBKgykylZuRXu8jIv1tXXnT2x38Oltldqq').subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  onUserSignIn(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this.isLoading.set(true);

    this.authService.createToken(username!, password!).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
