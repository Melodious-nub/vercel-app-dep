import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'vex-return-asset-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './return-asset-modal.component.html',
  styleUrls: ['./return-asset-modal.component.scss']
})
export class ReturnAssetModalComponent {
  assetName: any;
  sendEmailNotification: boolean = true;
  date = new Date();

  constructor(public dialogRef: MatDialogRef<ReturnAssetModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // Assign the asset name from the data passed
    this.assetName = data.assetName;
  }

  onSave(): void {
    // Logic to save the note with attachment data if available
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
