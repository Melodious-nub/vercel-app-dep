import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-return-asset-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
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

  constructor(public dialogRef: MatDialogRef<ReturnAssetModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private api: DataService, private snackbar: MatSnackBar) {
    // Assign the asset name from the data passed
    this.assetName = data.assetName;
  }

  onSave(): void {
    // console.log(this.data.assetId);

    const requestData = JSON.stringify('BRAND_NEW'); // Send as a plain string

    this.api.returnAsset(this.data.assetId, requestData).subscribe({
      next: (res) => {
        // console.log(res);
        this.snackbar.open(res, 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
