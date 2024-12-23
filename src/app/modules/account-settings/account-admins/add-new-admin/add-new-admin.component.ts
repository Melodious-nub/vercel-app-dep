import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'vex-add-new-admin',
  standalone: true,
  animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './add-new-admin.component.html',
  styleUrls: ['./add-new-admin.component.scss']
})
export class AddNewAdminComponent {
  admins:any = {
    name: '',
    email: '',
    phone: ''
  };
  
  constructor(public dialogRef: MatDialogRef<AddNewAdminComponent>) {}

  onSave(): void {
    // Logic to save the note with attachment data if available
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
