
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'ems-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    
  @Input({ required: true }) onLogin!: () => void;
  protected readonly isLoading = signal(false);
  onSignIn() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.onLogin();
    }, 500);
  }
}
