import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-add-new-training-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-new-training-modal.component.html',
  styleUrls: ['./add-new-training-modal.component.scss']
})
export class AddNewTrainingModalComponent implements OnInit {
  assignTo = 'specific';
  selectedValue: string = '';
  // requireAttachment = false;
  // sendEmailNotificationEmployee = true;
  paymentType: string = '';
  trainingFormat: string = '';
  trainingDateType: string = 'single'; // default radio selection for training date
  cost: string = '0'; // cost field
  trainingDate: FormControl = new FormControl(''); // for due date
  rangePickerControl: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  trainingName: string = '';
  trainingDetails: string = '';

  employees: any = [];

  // New fields for expiry date
  hasExpiryDate: boolean = false; // Slide toggle for expiry date
  expiryOption: string = 'specificDate'; // Default option for expiry date
  expiryYears: number[] = [1, 2, 3, 4, 5, 6, 7]; // Expiry period options
  expiryDatePickerControl: FormControl = new FormControl(''); // Specific expiry date control
  expiryPeriod: number | null = null; // Stores selected expiry period  

  showAlert = true;
  attachmentName: string | null = null;
  attachmentFile: File | null = null;

  selectedValueMultiple = new FormControl('');
  assignedValue: string = ''; // This will hold the final string value
  updateAssignedValue() {
    if (this.assignTo === 'specific') {
      this.assignedValue = JSON.stringify(this.selectedValue) || ''; // Single ID
    } else if (this.assignTo === 'multiple') {
      const multipleIds: any = this.selectedValueMultiple.value || [];
      this.assignedValue = multipleIds.join(','); // Comma-separated string of IDs
    }
  }

  constructor(public dialogRef: MatDialogRef<AddNewTrainingModalComponent>, private destroyRef: DestroyRef, private api: DataService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchAlEmployee();
  }

  fetchAlEmployee() {
    const subscription = this.api.getAllEmployeeList().subscribe({
      next: (res) => {
        this.employees = res;
        // console.log(this.employees);
      },
      complete: () => console.log('Completed call'),
      error: (err) => console.log(err)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  private formatDate(date: any): string {
    return date ? new Date(date).toLocaleDateString('en-CA') : ''; // Format as 'YYYY-MM-DD'
  }

  onSave(): void {
    // Format trainingDate and trainingDateEnd based on the type
    const trainingDate = this.trainingDateType === 'single'
      ? this.formatDate(this.trainingDate.value)
      : this.formatDate(this.rangePickerControl.value.start);

    const trainingDateEnd = this.trainingDateType === 'single'
      ? this.formatDate(this.trainingDate.value)
      : this.formatDate(this.rangePickerControl.value.end);

    // Format expiryDate
    const expiryDate = this.formatDate(this.expiryDatePickerControl.value);

    const reqBody = {
      assignTo: this.assignTo,
      trainingName: this.trainingName,
      trainingDetails: this.trainingDetails,
      trainingFormat: this.trainingFormat,
      paymentType: this.paymentType,
      cost: this.cost,
      trainingDate: trainingDate,
      trainingDateEnd: trainingDateEnd,
      expiryDate: expiryDate,
      file: this.attachmentFile,
      employeeIds: this.assignedValue
    }
    console.log(reqBody);

    const formData = new FormData();

    // append all data together
    formData.append('assignTo', reqBody.assignTo);
    formData.append('trainingName', reqBody.trainingName);
    formData.append('trainingDetails', reqBody.trainingDetails);
    formData.append('trainingFormat', reqBody.trainingFormat);
    formData.append('paymentType', reqBody.paymentType);
    formData.append('cost', reqBody.cost);
    formData.append('trainingDate', reqBody.trainingDate);
    formData.append('trainingDateEnd', reqBody.trainingDateEnd);
    formData.append('expiryDate', reqBody.expiryDate);
    if (reqBody.file) {
      formData.append('file', reqBody.file);
      // console.log(this.profilePicFile, 'image');
    }
    formData.append('employeeIds', reqBody.employeeIds);

    const subscription = this.api.createTraining(formData).subscribe({
      next: (res) => {
        this.snackbar.open(res, 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      },
      complete: () => this.dialogRef.close(),
      error: err => console.log(err)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Check file size (limit: 25 MB)
      if (file.size > 25 * 1024 * 1024) {
        alert('File size exceeds the limit of 25MB. Please select a smaller file.');
        this.attachmentFile = null;
        this.attachmentName = null;
        return;
      }

      this.attachmentFile = file;
      this.attachmentName = file.name;
    }
  }

  removeAttachment(): void {
    this.attachmentName = null;
    this.attachmentFile = null;
  }

}
