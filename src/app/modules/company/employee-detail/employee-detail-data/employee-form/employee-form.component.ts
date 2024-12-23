import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { ActivatedRoute, Router } from '@angular/router';
import { employeeData } from 'src/static-data/employees';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatCardModule } from '@angular/material/card';
import { AddPositionModalComponent } from './add-position-modal/add-position-modal.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export interface Position {
  positionName: string;
  startDate: Date;
}

@Component({
  selector: 'vex-employee-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
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
    MatOptionModule,
    MatAutocompleteModule,
    NgFor,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeId!: string;
  @Input() employeeDetails: any = []; // Define the type for employee details
  // Separate property to hold the image file
  profilePic: string | null = null; // To store the selected image name

  // variables
  separatorKeysCodes: number[] = [ENTER, COMMA];
  teams = ['Team A', 'Team B', 'Team C'];
  locations = ['Location 1', 'Location 2', 'Location 3'];
  holidayGroups = ['Group 1', 'Group 2', 'Group 3'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private api: DataService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id')!;
      this.getEmployeeDetails(); // Fetch employee details using the ID
    });
  }

  // Method to fetch employee details
  getEmployeeDetails(): void {
    this.employeeDetails.imageSrc = 'https://avatar.iran.liara.run/public/2';
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

  // for positions
  positions: Position[] = [];

  openAddPositionModal(): void {
    const dialogRef = this.dialog.open(AddPositionModalComponent, {
      width: '400px',
      disableClose: true,
      data: { positionName: '', startDate: null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.positions.push(result);
      }
    });
  }

  back() {
    this.router.navigate(['dashboard/company']);
  }

  submit() {
    const reqestBody = {
      name: this.employeeDetails.name,
      designation: this.employeeDetails.designation,
      email: this.employeeDetails.email,
      workPhone: this.employeeDetails.phone,
      startDate: this.employeeDetails.startDate,
      employeeStatus: this.employeeDetails.employeeStatus,
      onBoardingMentor: this.employeeDetails.onBoardingMentor,
      directManager: this.employeeDetails.directManager,
      team: this.employeeDetails.team,
      location: this.employeeDetails.location,
      publicHolidayGroup: this.employeeDetails.publicHolidayGroup,
      accessLevel: this.employeeDetails.accessLevel,
      drivingLicense: this.employeeDetails.drivingLicense,
      employeeInternalId: this.employeeDetails.employeeInternalId,
      linkedin: this.employeeDetails.linkedin,
      skype: this.employeeDetails.skype,
      positions: this.positions
    };
    // console.log(reqestBody, 'request body');

    this.api.updateEmpDetails(reqestBody, this.employeeId).subscribe({
      next: (res) => {
        // console.log(res, 'success');

        // Show success message
        this.snackbar.open('Employee data added successfully!', 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
        // console.log(res, 'res of api');
      },
      error: (error) => {
        this.snackbar.open('Server error!', 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
        // console.log(error, 'error');
      }
    });
  }
}
