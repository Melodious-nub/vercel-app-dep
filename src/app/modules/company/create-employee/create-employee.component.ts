import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-create-employee',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms],
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatOptionModule,
    NgIf,
    MatAutocompleteModule,
    NgFor,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule
  ],
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    department: [null, Validators.required],
    designation: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    startDate: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    position: [null, Validators.required],
    // onboardingMentor: ['', Validators.required],
    // directManager: ['', Validators.required],
    team: [null, Validators.required],
    location: [null, Validators.required],
    // publicHolidayGroup: ['', Validators.required],
    workingPattern: ['', Validators.required],
    // isHoliday: [false],
    // isSickDay: [false],
    // isBusinessTrip: [false],
    // isConference: [false],
    // isWorkFromHome: [false],
    // isAdministrator: [false],
    // isDirectManager: [false],
    // isTeamManager: [false],
  });

  allDepartments: any[] = [];
  designationByDept: any[] = [];

  policies: any[] = [];
  selectedPolicyIds: number[] = []; // Stores selected policy IDs
  positions: any[] = [];
  teams: any[] = [];
  locations: any[] = [];
  // publicHolidayGroups = ['General', 'UK', 'India', 'US'];
  workingPatterns: any[] = [];

  isEditable = false;
  // Separate property to hold the image file
  profilePic: string | null = null; // To store the Base64 string
  profilePicFile: File | null = null; // To store the selected file

  constructor(private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<CreateEmployeeComponent>, private api: DataService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { refreshEmployees: () => void }) { }

  ngOnInit(): void {
    this.fetchDepartment();
  }

  // Fetch all departments
  fetchDepartment() {
    this.api.getAllDepartments().subscribe({
      next: (res) => {
        this.allDepartments = res;
      },
      error: () => {
        this.snackbar.open('Failed to load departments. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  // Handle department selection
  onDepartmentChange(departmentId: number) {
    if (departmentId) {
      this.fetchDesignationByDept(departmentId);
    } else {
      this.designationByDept = [];
      this.firstFormGroup.patchValue({ designation: null });
    }
  }

  // Fetch designations by department
  fetchDesignationByDept(departmentId: number) {
    this.api.getDesignationByDepartment(departmentId).subscribe({
      next: (res) => {
        this.designationByDept = res;
      },
      error: () => {
        this.snackbar.open('Failed to load designations. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  fetchDynamicSettings() {
    this.api.getAllSettingDetails(this.firstFormGroup.value.department, this.firstFormGroup.value.designation).subscribe({
      next: (res) => {
        this.policies = res.policies;
        this.positions = res.positions || [];
        this.teams = res.teams || [];
        this.workingPatterns = res.employmentStatus || [];
        console.log('policies:', this.policies);
      },
      error: () => {
        this.snackbar.open('Failed to load designations. Please try again.', 'Close', { duration: 3000 });
      }
    });

    this.fetchCountries();
  }

  fetchCountries() {
    this.api.getAllCountries().subscribe(res => {
      this.locations = res;
    })
  }

  // Toggle the selection of a policy
  togglePolicySelection(policyId: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedPolicyIds.push(policyId);
    } else {
      this.selectedPolicyIds = this.selectedPolicyIds.filter(id => id !== policyId);
    }
    // console.log('Selected Policies:', this.selectedPolicyIds);
  }

  // Close function to handle the close button
  close() {
    // console.log('Close button clicked');
    this.dialogRef.close();
    // Add your close logic here
  }

  // Function to handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.profilePicFile = input.files[0]; // Store the file object

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePic = e.target.result; // Set the preview image as the file's Base64 data URL
      };
      reader.readAsDataURL(this.profilePicFile); // Read file as Base64
    }
  }

  // Function to clear the selected file
  // clearFile(): void {
  //   this.profilePic = null; // Reset the image name
  // }

  // Reset function for the second step
  resetForm() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.profilePic = null;
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  individualApprovers: string[] = []; // Initialize the individualApprovers array
  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add approver if it has a value
    if (value) {
      this.individualApprovers.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(approver: string): void {
    const index = this.individualApprovers.indexOf(approver);

    if (index >= 0) {
      this.individualApprovers.splice(index, 1);
      this.announcer.announce(`Removed ${approver}`);
    }
  }

  edit(approver: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove approver if it no longer has a name
    if (!value) {
      this.remove(approver);
      return;
    }

    // Edit existing approver
    const index = this.individualApprovers.indexOf(approver);
    if (index >= 0) {
      this.individualApprovers[index] = value;
    }
  }

  onEmployeeCreate(stepper: MatStepper) {
    if (this.firstFormGroup.valid) {
      this.fetchDynamicSettings();
      stepper.next();
    }
  }

  employeeCreatedAcoountSettings() {
    if (this.secondFormGroup.valid) {
      const startDateObj = this.firstFormGroup.value.startDate;
      // Format the date to 'YYYY-MM-DD'
      const formattedDate = startDateObj ? new Date(startDateObj).toLocaleDateString('en-CA') : '';
      // Simulate API call for employee creation
      const body: any = {
        name: this.firstFormGroup.value.name, phone: this.firstFormGroup.value.phone, email: this.firstFormGroup.value.email, designationId: this.firstFormGroup.value.designation, departmentId: this.firstFormGroup.value.department, startDate: formattedDate, policyIds: this.selectedPolicyIds.join(','), positionId: this.secondFormGroup.value.position, teamId: this.secondFormGroup.value.team, countryId: this.secondFormGroup.value.location, employmentStatus: this.secondFormGroup.value.workingPattern
      }

      console.log(body, this.profilePicFile);
      const formData = new FormData();

      // Ensure profilePic is valid before appending
      if (this.profilePicFile) {
        formData.append('image', this.profilePicFile); // Append the base64 string
      }

      formData.append('name', body.name);
      formData.append('phone', body.phone);
      formData.append('email', body.email);
      formData.append('designationId', body.designationId);
      formData.append('departmentId', body.departmentId);
      formData.append('startDate', body.startDate);
      formData.append('policyIds', body.policyIds);
      formData.append('positionId', body.positionId);
      formData.append('teamId', body.teamId);
      formData.append('countryId', body.countryId);
      formData.append('employmentStatus', body.employmentStatus);

      this.api.createEmployee(formData).subscribe({
        next: (response) => {
          // Show success message
          this.snackbar.open('Employee setting added successfully!', 'Close', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' });
          console.log(response, 'final res');
          this.close();
        }, error: (error) => {
          // Show error message
          this.snackbar.open('Server error!', 'Close', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' });
          // this.close();
        }
      })
    }
  }
}
