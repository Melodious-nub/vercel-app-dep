import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'vex-add-onboarding-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-onboarding-modal.component.html',
  styleUrls: ['./add-onboarding-modal.component.scss']
})
export class AddOnboardingModalComponent {
  task:any;
  assignTo = 'specific';
  selectedValue!: string;
  requireAttachment = false; 

  employees = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Brown',
    'Shawon talukder',
    'Imran sarker'
  ];

  selectedValueMultiple = new FormControl('');
  days = 30;

  constructor(public dialogRef: MatDialogRef<AddOnboardingModalComponent>) {}

  onSave(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
