import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    RouterLink,
    MatSnackBarModule,
    MATERIAL_IMPORTS
  ]
})
export class RegisterComponent {
  firstFormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required]
  });

  secondFormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    organization: ['', Validators.required],
    country: ['', Validators.required],
    numberOfEmployees: ['', Validators.required],
  });

  countries = ['Bangladesh', 'USA', 'UK', 'India', 'Canada'];
  employeeCounts = ['1-10', '11-50', '51-200', '201-500', '501+'];

  inputType = 'password';
  visible = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar
  ) { }

  createAccount(stepper: MatStepper) {
    if (this.firstFormGroup.valid) {
      stepper.next();
    } else {
      this.snackbar.open('Please provide valid input', 'Close', { duration: 3000 });
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
