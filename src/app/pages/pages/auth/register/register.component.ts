import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';

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
export class RegisterComponent implements OnInit {
  firstFormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required]
  });

  secondFormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    organization: ['', Validators.required],
    country: [0, Validators.required],
    numberOfEmployees: [0, Validators.required],
    phoneNumber: ['', Validators.required],
  });

  countries: { id: number, name: string }[] = [];
  employeeCounts: { id: number, label: string }[] = [];

  inputType = 'password';
  inputType2 = 'password';
  visible = false;
  visible2 = false;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private api: DataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchCountries();
    this.fetchInitializeEmployeeCounts();
  }

  fetchCountries() {
    this.api.getAllCountries().subscribe((res: any[]) => {
      this.countries = res.map(country => ({ id: country.id, name: country.name }));
    });
  }

  fetchInitializeEmployeeCounts() {
    this.api.getAllEmployeeRange().subscribe(res => {
      // console.log(res);
      this.employeeCounts = res;
    })
  }

  createAccount(stepper: MatStepper) {
    if (this.firstFormGroup.valid) {
      stepper.next();
    } else {
      this.snackbar.open('Please provide valid input', 'Close', { duration: 3000 });
    }
  }

  isSubmitting = false; // Flag to track submission state

  registerAccount() {
    if (this.secondFormGroup.valid) {
      // Set the submission flag
      this.isSubmitting = true;

      const body = {
        email: this.firstFormGroup.value.email,
        password: this.firstFormGroup.value.password,
        phoneNumber: this.secondFormGroup.value.phoneNumber,
        companyName: this.secondFormGroup.value.organization,
        firstName: this.secondFormGroup.value.firstName,
        lastName: this.secondFormGroup.value.lastName,
        employeeRangeId: this.secondFormGroup.value.numberOfEmployees,
        countryId: this.secondFormGroup.value.country
      };

      // console.log(body);

      this.api.resgister(body).subscribe({
        next: () => {
          // console.log(res);
          this.isSubmitting = false; // Re-enable the button
          this.snackbar.open('Account created successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/welcome-page']);
        },
        error: (err) => {
          // console.error(err);
          this.isSubmitting = false; // Re-enable the button

          // Handle specific error message
          if (err?.error?.message) {
            this.snackbar.open(err.error.message, 'Close', { duration: 3000 });
          } else {
            // Default error message
            this.snackbar.open('Something went wrong. Please try again later.', 'Close', { duration: 3000 });
          }
        }
      });
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

  toggleVisibility2() {
    if (this.visible2) {
      this.inputType2 = 'password';
      this.visible2 = false;
      this.cd.markForCheck();
    } else {
      this.inputType2 = 'text';
      this.visible2 = true;
      this.cd.markForCheck();
    }
  }
}
