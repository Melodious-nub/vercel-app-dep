import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'vex-add-document-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.scss']
})
export class AddDocumentModalComponent implements OnInit {
  // variables
  attachmentName: string | null = null;
  attachmentFile: File | null = null;
  categoryId = 1;
  shareDocumentWith = 'current_user';
  requireAccept = false;
  sendEmailNotification = true;
  description: string = '';
  assignTo = 'specific';
  selectedValue: string = '';
  employees: any = [];
  isLoading = false;

  categoryData = [
    { documentCategoryId: 1, name: 'General' },
    { documentCategoryId: 2, name: 'Off Boarding' },
    { documentCategoryId: 3, name: 'On Boarding' },
  ]

  constructor(public dialogRef: MatDialogRef<AddDocumentModalComponent>, private destroyRef: DestroyRef, private api: DataService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { employeeId: any, employeeName: string, isGlobalDoc: boolean }) {
    console.log(data.employeeId);

  }

  ngOnInit(): void {
    this.fetchAlEmployee();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  selectedValueMultiple = new FormControl('');
  assignedValue: string = ''; // This will hold the final string value
  updateAssignedValue() {
    if (this.assignTo === 'specific') {
      this.assignedValue = JSON.stringify(this.selectedValue) || ''; // Single ID
    } else if (this.assignTo === 'multiple') {
      const multipleIds: any = this.selectedValueMultiple.value || [];
      this.assignedValue = multipleIds.join(','); // Comma-separated string of IDs
    }
  }

  fetchAlEmployee() {
    const subscription = this.api.getAllEmployeeList().subscribe({
      next: (res) => {
        this.employees = res;
        // console.log(this.employees);
      },
      // complete: () => console.log('Completed call'),
      error: (err) => console.log(err)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
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

  isFormValid(): boolean {
    return this.description.trim() !== '' && this.categoryId !== null && this.attachmentFile !== null;
  }

  onAddDocument(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    const body = {
      employeeId: this.data?.employeeId || this.assignedValue,
      description: this.description,
      shareType: 'CURRENT_USER',
      documentCategoryId: this.categoryId
    }

    if (this.attachmentFile) {
      formData.append('file', this.attachmentFile);
      console.log(this.attachmentFile, body);
    }
    formData.append('description', body.description);
    formData.append('employeeId', body.employeeId);
    formData.append('shareType', body.shareType);
    formData.append('documentCategoryId', JSON.stringify(body.documentCategoryId));

    this.api.createDocuments(formData).subscribe({
      next: () => {
        this.snackbar.open('Document has been successfully created.', 'Close', {
          duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom'
        });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackbar.open('An error occurred while creating the document. Please try again later.', 'Close', {
          duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom'
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}
