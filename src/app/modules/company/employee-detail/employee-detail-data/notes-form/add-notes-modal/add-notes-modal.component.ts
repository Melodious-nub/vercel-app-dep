import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialogRef } from '@angular/material/dialog';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';

@Component({
  selector: 'vex-add-notes-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
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

  constructor(public dialogRef: MatDialogRef<AddNotesModalComponent>) {}

  onSave(): void {
    // Logic to save the note with attachment data if available
    this.dialogRef.close({ note: this.data, attachment: this.attachmentFile });
  }

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
}
