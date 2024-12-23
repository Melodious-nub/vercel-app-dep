import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'vex-add-long-term-leave-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-long-term-leave-modal.component.html',
  styleUrls: ['./add-long-term-leave-modal.component.scss']
})
export class AddLongTermLeaveModalComponent {
  // Initial value for the date field
  startDate = new Date(); 
  isHoliday: boolean = false;
  
  constructor(public dialogRef: MatDialogRef<AddLongTermLeaveModalComponent>) {}

  onSave(): void {
    // Logic to save the note with attachment data if available
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
