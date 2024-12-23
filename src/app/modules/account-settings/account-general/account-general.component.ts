import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';

@Component({
  selector: 'vex-account-general',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './account-general.component.html',
  styleUrls: ['./account-general.component.scss']
})
export class AccountGeneralComponent {
  isEditing = false;

  user = {
    fullName: 'David Smith',
    email: 'david.smith@example.com',
    phoneNumber: '+1 (930) 502-3182',
    companyName: 'Example Company',
    designation: 'Software Engineer',
    workHours: '9 AM - 5 PM',
  };

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveChanges() {
    this.isEditing = false;
    // Save changes logic here
    console.log('Changes saved:', this.user);
  }  

}
