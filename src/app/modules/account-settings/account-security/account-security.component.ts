import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';

@Component({
  selector: 'vex-account-security',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './account-security.component.html',
  styleUrls: ['./account-security.component.scss']
})
export class AccountSecurityComponent {
  securityForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: false,
    smsNotifications: false,
    twoStepAuth: false,
    otpMethod: 'phone' as 'phone' | 'email' | null,
  };
  showPasswordFields: boolean = false;

  constructor() {}

  togglePasswordFields(): void {
    this.showPasswordFields = !this.showPasswordFields;
  }

  toggleTwoStepAuth(): void {
    if (this.securityForm.twoStepAuth) {
      this.securityForm.otpMethod = 'phone'; // default to phone OTP method
    } else {
      this.securityForm.otpMethod = null;
    }
  }  

  updateNotifications() {
    
  }

}
