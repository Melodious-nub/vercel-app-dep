import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'vex-add-new-training-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-new-training-modal.component.html',
  styleUrls: ['./add-new-training-modal.component.scss']
})
export class AddNewTrainingModalComponent {
  form:any;
  task:any;
  assignTo = 'specific';
  selectedValue!: string;
  requireAttachment = false; 
  sendEmailNotificationEmployee = true;
  paymentType: string = '';
  trainingFormat: string = '';
  trainingDateType: string = 'single'; // default radio selection for training date
  cost: number | null = null; // cost field
  dueDatePicker: FormControl = new FormControl(); // for due date
  rangePicker: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  employees = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Brown',
    'Shawon talukder',
    'Imran sarker'
  ];

  // New fields for expiry date
  hasExpiryDate: boolean = false; // Slide toggle for expiry date
  expiryOption: string = 'specificDate'; // Default option for expiry date
  expiryYears: number[] = [1, 2, 3, 4, 5, 6, 7]; // Expiry period options
  expiryDatePicker: FormControl = new FormControl(); // Specific expiry date control
  expiryPeriod: number | null = null; // Stores selected expiry period  

  showAlert = true;
  attachmentName: string | null = null;
  attachmentFile: File | null = null;

  selectedValueMultiple = new FormControl('');
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(public dialogRef: MatDialogRef<AddNewTrainingModalComponent>) {}

  onSave(): void {
    this.dialogRef.close();
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
