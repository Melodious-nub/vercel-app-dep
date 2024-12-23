import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  inputType = 'password';
  visible = false;
  loading = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {}

  send() {
    if (this.form.valid) {
      // Start loading
      this.loading = true;

      const email = this.form.get('email')?.value || '';
      const password = this.form.get('password')?.value || '';

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.loading = false;  // Stop loading
          if (response.success) {
            this.snackbar.open('Login successful!', 'Close', { duration: 3000 });
            this.router.navigate(['dashboard/analytics']);
          } else {
            this.snackbar.open('Login failed. Please try again.', 'Close', { duration: 3000 });
          }
        },
        error: () => {
          this.loading = false;  // Stop loading on error
          this.snackbar.open('Login failed. Please try again.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackbar.open('Please enter valid credentials.', 'Close', { duration: 3000 });
    }
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}