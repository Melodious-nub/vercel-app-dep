import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'vex-add-tasks-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-tasks-modal.component.html',
  styleUrls: ['./add-tasks-modal.component.scss']
})
export class AddTasksModalComponent {
  task:any;
  assignTo = 'specific';
  selectedValue!: string;
  requireAttachment = false; 
  sendEmailNotification = false;
  sendEmailNotificationEmployee = false;

  employees = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Brown',
    'Shawon talukder',
    'Imran sarker'
  ];

  selectedValueMultiple = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(public dialogRef: MatDialogRef<AddTasksModalComponent>) {}

  onSave(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
