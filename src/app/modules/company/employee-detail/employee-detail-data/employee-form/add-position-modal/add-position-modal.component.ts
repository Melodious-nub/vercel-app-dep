import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Position } from '../employee-form.component';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';

@Component({
  selector: 'vex-add-position-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS
  ],
  templateUrl: './add-position-modal.component.html',
  styleUrls: ['./add-position-modal.component.scss']
})
export class AddPositionModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AddPositionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Position
  ) {}
  
  onSave(): void {
    if (this.data.positionName && this.data.startDate) {
      this.dialogRef.close(this.data);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
