import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { AddNewAdminComponent } from './add-new-admin/add-new-admin.component';
import { SetPermissionsComponent } from './set-permissions/set-permissions.component';

@Component({
  selector: 'vex-account-admins',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './account-admins.component.html',
  styleUrls: ['./account-admins.component.scss']
})
export class AccountAdminsComponent {
  admins = [
    { name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '234-567-8901' },
  ];

  columns = ['name', 'email', 'phone', 'permissions', 'actions'];

  removeAdmin(admin: any) {
    this.admins = this.admins.filter(a => a !== admin);
  }

  constructor(private dialog: MatDialog) {}

  openAddNewAdminModal() {
    const dialogRef = this.dialog.open(AddNewAdminComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        // console.log('Dialog result:', result);
      }
    });
  }

  openPermissionModal() {
    const dialogRef = this.dialog.open(SetPermissionsComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        // console.log('Dialog result:', result);
      }
    });
  }

}
