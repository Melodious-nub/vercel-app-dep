import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'vex-set-permissions',
  standalone: true,
  animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './set-permissions.component.html',
  styleUrls: ['./set-permissions.component.scss']
})
export class SetPermissionsComponent { 
  permissions = {
    addNewAdmin: false,
    deleteAdmins: false,
    manageEmployees: false,
    approveEmployeeTasks: false
  };

  constructor(public dialogRef: MatDialogRef<SetPermissionsComponent>) {}

  onSave(): void {
    // Logic to save the selected permissions
    this.dialogRef.close(this.permissions);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
