import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'vex-add-asset-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-asset-modal.component.html',
  styleUrls: ['./add-asset-modal.component.scss']
})
export class AddAssetModalComponent {
  // Initial value for the date field
  date = new Date();
  sendEmailNotification = false;  

  constructor(public dialogRef: MatDialogRef<AddAssetModalComponent>) {}

  onSave(): void {
    // Logic to save the note with attachment data if available
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
