import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';

@Component({
  selector: 'vex-edit-my-profile',
  standalone: true,
  animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.scss']
})
export class EditMyProfileComponent {
  profilePic: string | null = 'assets/img/avatars/1.jpg'; // To store the selected image name

  constructor(@Inject(MAT_DIALOG_DATA) public aboutData: any, public dialogRef: MatDialogRef<EditMyProfileComponent>) {}

  onSave(): void {
    // Logic to save the note with attachment data if available
    this.dialogRef.close(this.aboutData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Function to handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePic = e.target.result; // Set the preview image as the file's base64 data URL
      };
      reader.readAsDataURL(input.files[0]);
    }
  } 

}
