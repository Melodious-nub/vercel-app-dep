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
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatCardModule } from '@angular/material/card';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    // NgFor,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeId!: string;
  employeeDetails: any = []; // Define the type for employee details
  // Separate property to hold the image file
  profilePic: string | null = null; // To store the selected image name
  imageSrc: any;
  profilePicFile: File | null = null; // To store the selected file

  // variables
  separatorKeysCodes: number[] = [ENTER, COMMA];

  allDepartments: any[] = [];
  designationByDept: any[] = [];
  positions: any[] = [];
  teams: any[] = [];
  locations: any[] = [];
  // publicHolidayGroups = ['General', 'UK', 'India', 'US'];
  workingPatterns: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private api: DataService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id')!;
      this.getEmployeeDetails(); // Fetch employee details using the ID
    });
  }

  // Fetch all departments
  fetchDepartment() {
    this.api.getAllDepartments().subscribe({
      next: (res) => {
        this.allDepartments = res;
        this.onDepartmentChange();
      },
      error: () => {
        this.snackbar.open('Failed to load departments. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  // Handle department selection
  onDepartmentChange() {
    if (this.employeeDetails.departmentid) {
      this.fetchDesignationByDept(this.employeeDetails.departmentid);
    } else {
      this.designationByDept = [];
    }
  }

  // Fetch designations by department
  fetchDesignationByDept(departmentId: number) {
    this.api.getDesignationByDepartment(departmentId).subscribe({
      next: (res) => {
        this.designationByDept = res;
        this.fetchDynamicSettings();
      },
      error: () => {
        this.snackbar.open('Failed to load designations. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  fetchDynamicSettings() {
    console.log(this.employeeDetails.departmentid, this.employeeDetails.designationid);

    this.api.getAllSettingDetails(this.employeeDetails.departmentid, this.employeeDetails.designationid).subscribe({
      next: (res) => {
        this.positions = res.positions || [];
        console.log(this.positions);

        this.teams = res.teams || [];
        this.workingPatterns = res.employmentStatus || [];
      },
      error: () => {
        this.snackbar.open('Failed to load dynamic settings. Please try again.', 'Close', { duration: 3000 });
      }
    });

    // this.fetchCountries();
  }

  // fetchCountries() {
  //   this.api.getAllCountries().subscribe(res => {
  //     this.locations = res;
  //   })
  // }

  // Method to fetch employee details
  getEmployeeDetails(): void {
    this.fetchEmployeeDetails();
    setTimeout(() => {
      this.fetchDepartment();
      this.fetchEmployeeImage();
    }, 1000);
  }

  fetchEmployeeDetails() {
    this.api.getEmployeeDetails(this.employeeId).subscribe(res => {
      this.employeeDetails = res;
    })
  }

  fetchEmployeeImage() {
    this.api.getEmployeeImage(this.employeeId).subscribe(res => {
      if (res && res.image) {
        // Prefix the base64 string with the appropriate data URL
        this.imageSrc = 'data:image/jpeg;base64,' + res.image;
        // console.log(res);
      }
    })
  }

  // Function to handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.profilePicFile = input.files[0]; // Store the file object
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePic = e.target.result; // Set the preview image as the file's base64 data URL
        this.imageSrc = this.profilePic;  // Update the image source to show the preview
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // for positions
  // positions: Position[] = [];

  // openAddPositionModal(): void {
  //   const dialogRef = this.dialog.open(AddPositionModalComponent, {
  //     width: '400px',
  //     disableClose: true,
  //     data: { positionName: '', startDate: null }
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.positions.push(result);
  //     }
  //   });
  // }

  back() {
    this.router.navigate(['dashboard/company']);
  }

  isLoading: boolean = false;
  submit() {
    this.isLoading = true;
    const formData = new FormData();

    const reqestBody = {
      name: this.employeeDetails.employeename,
      phone: this.employeeDetails.phone,
      email: this.employeeDetails.email,
      departmentId: this.employeeDetails.departmentid,
      designationId: this.employeeDetails.designationid,
      startDate: this.employeeDetails.startdate,
      positionId: this.employeeDetails.positionid,
      teamId: this.employeeDetails.teamid,
      employmentStatus: this.employeeDetails.employmentstatus,
      employeeId: this.employeeDetails.employeeid,
      linkedInUrl: this.employeeDetails.linkedinurl,
      skypeUrl: this.employeeDetails.skypeurl,
      drivingLicence: this.employeeDetails.drivinglicense,
      // eId: JSON.parse(this.employeeId)
    };
    // console.log(reqestBody, 'request body');

    // append all data together for sending in backend
    if (this.profilePicFile) {
      formData.append('image', this.profilePicFile);
      // console.log(this.profilePicFile, 'image');
    }
    formData.append('name', reqestBody.name);
    formData.append('phone', reqestBody.phone);
    formData.append('email', reqestBody.email);
    formData.append('departmentId', reqestBody.departmentId);
    formData.append('designationId', reqestBody.designationId);
    formData.append('startDate', reqestBody.startDate);
    formData.append('positionId', reqestBody.positionId);
    formData.append('teamId', reqestBody.teamId);
    formData.append('employmentStatus', reqestBody.employmentStatus);
    formData.append('employeeId', reqestBody.employeeId);
    formData.append('linkedInUrl', reqestBody.linkedInUrl);
    formData.append('skypeUrl', reqestBody.skypeUrl);
    formData.append('drivingLicence', reqestBody.drivingLicence);
    formData.append('eId', JSON.parse(this.employeeId));

    this.api.updateEmployeeDetails(formData).subscribe({
      next: (res) => {
        // console.log('success', res);
        this.isLoading = false;
        // Show success message
        this.snackbar.open('Employee data updated successfully!', 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
        // console.log(res, 'res of api');
      },
      error: (error) => {
        this.isLoading = false;
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
