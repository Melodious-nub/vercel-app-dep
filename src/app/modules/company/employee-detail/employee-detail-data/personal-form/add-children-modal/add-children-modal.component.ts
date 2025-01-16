import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Children } from '../personal-form.component';

@Component({
  selector: 'vex-add-children-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS
  ],
  templateUrl: './add-children-modal.component.html',
  styleUrls: ['./add-children-modal.component.scss']
})
export class AddChildrenModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AddChildrenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Children
  ) { }

  onSave(): void {
    if (this.data.name && this.data.birthDate && this.data.gender) {
      console.log(this.data);

      this.dialogRef.close(this.data);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
