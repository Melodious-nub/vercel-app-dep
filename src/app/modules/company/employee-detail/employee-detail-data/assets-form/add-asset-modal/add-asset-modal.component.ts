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
  attachmentName: string | null = null;
  attachmentFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<AddAssetModalComponent>, private api: DataService, @Inject(MAT_DIALOG_DATA) public data: { employeeId: any, employeeName: string }, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchAssetCategory();
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

  fetchAssetCategory() {
    this.api.getAllAssetName().subscribe({
      next: (res) => {
        this.assetategory = res;
        console.log(res, this.data.employeeId);
      },
      error: () => {
        this.snackbar.open('Server error. Please try again.', 'Close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom' });
      }
    });
  }

  private formatDate(date: any): string {
    return date ? new Date(date).toLocaleDateString('en-CA') : ''; // Format as 'YYYY-MM-DD'
  }

  onSave(): void {
    // assetName will add soon
    let body = {
      employeeId: JSON.parse(this.data.employeeId), assetId: this.assetAllocateForm.assetId, allocationDate: this.formatDate(this.assetAllocateForm.allocationDate), conditionOnAllocation: 'BRAND_NEW', status: 'ALLOCATED', serialNumber: this.assetAllocateForm.serialNumber, remarks: this.assetAllocateForm.remarks, assetName: this.assetAllocateForm.assetName, file: this.attachmentFile
    }

    const formData = new FormData();

    formData.append('employeeId', body.employeeId);
    formData.append('assetId', body.assetId);
    formData.append('allocationDate', body.allocationDate);
    formData.append('conditionOnAllocation', body.conditionOnAllocation);
    formData.append('status', body.status);
    formData.append('serialNumber', body.serialNumber);
    formData.append('remarks', body.remarks);
    formData.append('assetName', body.assetName);
    if (body.file) {
      formData.append('file', body.file);
    }

    console.log(body);

    this.api.allocateAsset(formData).subscribe({
      next: () => {
        this.snackbar.open('Asset allocated successfully', 'Close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom' });
        this.dialogRef.close(true);
      },
      error: (error) => {
        if (error.status === 200 && error.error.text) {
          // Parse the text manually for 200 OK responses
          this.snackbar.open(error.error.text, 'Close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom' });
          this.dialogRef.close(true);
        } else {
          console.error('Error:', error);
          this.snackbar.open('Failed to allocate asset.', 'Close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom' });
        }
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
