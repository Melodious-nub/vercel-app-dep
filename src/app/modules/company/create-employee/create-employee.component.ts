import { Component, Inject, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
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
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips'; 
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
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
export class CreateEmployeeComponent {
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    designation: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    startDate: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    position: ['', Validators.required],
    onboardingMentor: ['', Validators.required],
    directManager: ['', Validators.required],
    team: ['', Validators.required],
    location: ['', Validators.required],
    publicHolidayGroup: ['', Validators.required],
    workingPattern: ['', Validators.required],
    isHoliday: [false],
    isSickDay: [false],
    isBusinessTrip: [false],
    isConference: [false],
    isWorkFromHome: [false],
    isAdministrator: [false],
    isDirectManager: [false],
    isTeamManager: [false],
  });
  
  creadtedAcoountId:any;

  positions = ['Java', 'Management', 'Angular', 'SQA', 'Marketing', 'DevOps'];
  teams = ['Java team', 'Management team', 'Angular team', 'SQA team', 'Marketing team', 'DevOps team'];
  locations = ['Dhaka', 'London', 'New York', 'Amsterdam'];
  publicHolidayGroups = ['General', 'UK', 'India', 'US'];
  workingPatterns = ['Full-time', 'Part-time', 'Contractual'];

  isEditable = false;
  // Separate property to hold the image file
  profilePic: string | null = null; // To store the selected image name

  constructor(private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<CreateEmployeeComponent>, private api: DataService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { refreshEmployees: () => void }) {}

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
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePic = e.target.result; // Set the preview image as the file's base64 data URL
      };
      reader.readAsDataURL(input.files[0]);
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
      stepper.next();
      // Get form data
    //   const employeeData = this.firstFormGroup.value;
  
    //   // Format startDate
    //   if (employeeData.startDate) {
    //     employeeData.startDate = new Date(employeeData.startDate).toISOString().split('T')[0]; // Format as YYYY-MM-DD
    //   }
  
    //   // console.log(employeeData);
  
    //   // Simulate API call for employee creation
    //   this.api.createEmployee(employeeData).subscribe({
    //     next: (response) => {
    //       this.creadtedAcoountId = response.id;
    //       // console.log(this.creadtedAcoountId, 'created id');
  
    //       // Show success message
    //       this.snackbar.open('Employee created successfully!', 'Close', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' });

    //       // Call the parent's fetchAllEmployee method
    //       if (this.data?.refreshEmployees) {
    //         this.data.refreshEmployees();
    //       }
  
    //       // Go to the next step
    //       stepper.next();
    //     },
    //     error: (error) => {
    //       // Show error message
    //       this.snackbar.open('Failed to create employee. Please try again.', 'Close', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' });
    //     },
    //   });
    // } else {
    //   // Mark all fields as touched to show validation errors
    //   this.firstFormGroup.markAllAsTouched();
    //   this.snackbar.open('Please fill in all required fields.', 'Close', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' });
    }
  }  

  employeeCreatedAcoountSettings() {
    if (this.secondFormGroup.valid) {
      // Simulate API call for employee creation
      const employeeAccountSettingData = {
        position: this.secondFormGroup.value.position,
        onboardingMentor: 1,
        manager: 1,
        team: this.secondFormGroup.value.team,
        location: this.secondFormGroup.value.location,
        publicHolidayGroup: this.secondFormGroup.value.publicHolidayGroup,
        workingPattern: this.secondFormGroup.value.workingPattern,
        individualApprovers: [1, 2],
        holiday: this.secondFormGroup.value.isHoliday,
        sickDay: this.secondFormGroup.value.isSickDay,
        directManager: this.secondFormGroup.value.isDirectManager,
        conference: this.secondFormGroup.value.isConference,
        workFromHome: this.secondFormGroup.value.isWorkFromHome,
        administrator: this.secondFormGroup.value.isAdministrator,
        businessTrip: this.secondFormGroup.value.isBusinessTrip,
        teamManager: this.secondFormGroup.value.isTeamManager
      };

      const employeeId = this.creadtedAcoountId;
      // console.log(employeeAccountSettingData, employeeId, "employeeAccountSettingData");

      // this.api.createdEmployeeAcoountSetting(employeeAccountSettingData, employeeId).subscribe({
      //   next: (response) => {
      //     // Show success message
      //     this.snackbar.open('Employee setting added successfully!', 'Close', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' });
      //     // console.log(response, 'final res');
      //     this.close();
      //   }, error: (error) => {
      //     // Show error message
      //     this.snackbar.open('Server error!', 'Close', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' });
      //     this.close();
      //   }
      // })
    }
    this.close();
  }
}
