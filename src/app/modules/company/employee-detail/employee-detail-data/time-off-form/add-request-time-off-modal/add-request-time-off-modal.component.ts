import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { employeeData } from 'src/static-data/employees';

@Component({
  selector: 'vex-add-request-time-off-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-request-time-off-modal.component.html',
  styleUrls: ['./add-request-time-off-modal.component.scss']
})
export class AddRequestTimeOffModalComponent implements OnInit {
  assignTo = 'specific';
  selectedDay = 'singleDay';
  selectedValueMultiple = new FormControl('');
  employeeName: any;
  employees = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Brown',
    'Shawon talukder',
    'Imran sarker'
  ];

  constructor(public dialogRef: MatDialogRef<AddRequestTimeOffModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.employeeName = data.employeeDetails;
  }

  ngOnInit(): void {}

  onSave(): void {
    // Logic to save the note with attachment data if available
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
