import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-add-notes-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-notes-modal.component.html',
  styleUrls: ['./add-notes-modal.component.scss']
})
export class AddNotesModalComponent {
  data = {
    note: '',
    visibleToOthers: true,
  };
  showAlert = true;
  attachmentName: string | null = null;
  attachmentFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<AddNotesModalComponent>, private api: DataService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public parrentData: { employeeId: any }) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  closeAlert(): void {
    this.showAlert = false;
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

  addNewNote() {
    const formData = new FormData();

    if (this.attachmentFile) {
      formData.append('file', this.attachmentFile);
    }
    formData.append('content', this.data.note);
    formData.append('employeeId', this.parrentData.employeeId);
    formData.append('visibleToOthers', JSON.stringify(this.data.visibleToOthers));

    // console.log(this.attachmentFile, this.data.note, this.parrentData.employeeId, this.data.visibleToOthers);


    this.api.addNotes(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.snackbar.open('Note has been created', 'Close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom' });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.snackbar.open('Server error. Please try again.', 'Close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom' });
        console.log(error);
      }
    });
  }

}
