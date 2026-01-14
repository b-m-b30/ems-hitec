import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'ems-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  protected readonly isLoading = signal(false);
  onSignIn() {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 1000);
  }
}
