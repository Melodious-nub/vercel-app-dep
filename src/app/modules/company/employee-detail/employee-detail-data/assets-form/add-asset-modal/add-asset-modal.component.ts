import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-add-asset-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-asset-modal.component.html',
  styleUrls: ['./add-asset-modal.component.scss']
})
export class AddAssetModalComponent implements OnInit {
  // Initial value for the date field
  sendEmailNotification = false;
  assetategory: any[] = [];
  assetAllocateForm: any = {};

  constructor(public dialogRef: MatDialogRef<AddAssetModalComponent>, private api: DataService, @Inject(MAT_DIALOG_DATA) public data: { employeeId: any }, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchAssetCategory();
  }

  fetchAssetCategory() {
    this.api.getAllAssetName().subscribe({
      next: (res) => {
        this.assetategory = res;
        console.log(res, this.data.employeeId);
      },
      error: () => {
        this.snackbar.open('Server error. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  onSave(): void {
    // assetName will add soon
    let body = {
      employeeId: this.data.employeeId, assetId: this.assetAllocateForm.assetId, allocationDate: this.assetAllocateForm.allocationDate, conditionOnAllocation: 'BRAND_NEW', status: 'ALLOCATED', serialNumber: this.assetAllocateForm.serialNumber, remarks: this.assetAllocateForm.remarks
    }

    // console.log(body);

    this.api.allocateAsset(body).subscribe({
      next: () => {
        this.snackbar.open('Asset allocated successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (error) => {
        if (error.status === 200 && error.error.text) {
          // Parse the text manually for 200 OK responses
          this.snackbar.open(error.error.text, 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        } else {
          console.error('Error:', error);
          this.snackbar.open('Failed to allocate asset.', 'Close', { duration: 3000 });
        }
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
