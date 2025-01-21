import { Component, DestroyRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-add-tasks-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-tasks-modal.component.html',
  styleUrls: ['./add-tasks-modal.component.scss']
})
export class AddTasksModalComponent {
  assignTo = 'specific';
  selectedValue: string = '';
  title: string = '';
  description: string = '';
  deadline: FormControl = new FormControl('');
  requireAttachment = false;
  sendEmailNotification = false;
  sendEmailNotificationEmployee = false;
  attachmentName: string | null = null;
  attachmentFile: File | null = null;

  employees: any = [];

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

  constructor(public dialogRef: MatDialogRef<AddTasksModalComponent>, private api: DataService, private destroyRef: DestroyRef, private snackbar: MatSnackBar) { }
  ngOnInit(): void {
    this.fetchAlEmployee();
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

  private formatDate(date: any): string {
    return date ? new Date(date).toLocaleDateString('en-CA') : ''; // Format as 'YYYY-MM-DD'
  }

  onSave(): void {
    // Format expiryDate
    const deadline = this.formatDate(this.deadline.value);
    const reqBody = {
      assignTo: this.assignTo,
      employeeIds: this.assignedValue,
      title: this.title,
      description: this.description,
      deadline: deadline,
      file: this.attachmentFile
    }

    const formData = new FormData();

    // append all data here
    formData.append('assignTo', reqBody.assignTo);
    formData.append('employeeIds', reqBody.employeeIds);
    formData.append('title', reqBody.title);
    formData.append('description', reqBody.description);
    formData.append('deadline', reqBody.deadline);
    if (reqBody.file) {
      formData.append('file', reqBody.file);
    }

    const subscription = this.api.createTaskAssign(formData).subscribe({
      next: (res) => {
        this.snackbar.open(res, 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      },
      complete: () => this.dialogRef.close(true),
      error: err => console.log(err)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
