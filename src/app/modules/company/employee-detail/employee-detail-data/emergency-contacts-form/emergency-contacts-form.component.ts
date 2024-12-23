import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { AddEmergencyConatctModalComponent } from './add-emergency-conatct-modal/add-emergency-conatct-modal.component';

@Component({
  selector: 'vex-emergency-contacts-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './emergency-contacts-form.component.html',
  styleUrls: ['./emergency-contacts-form.component.scss']
})
export class EmergencyContactsFormComponent {

  constructor(private dialog: MatDialog) {}

  openEmergencyContactModal() {
    const dialogRef = this.dialog.open(AddEmergencyConatctModalComponent, {
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

  // for table
  ELEMENT_DATA: any[] = [
    { 
        name: 'John Doe', 
        relationship: 'Father', 
        phone: '123-456-7890', 
        workPhone: '123-111-2222', 
        email: 'john.doe@example.com', 
        country: 'United States', 
        address: '123 Main St, City A, United States', 
        postalCode: '10001' 
    },
    { 
        name: 'Jane Smith', 
        relationship: 'Mother', 
        phone: '234-567-8901', 
        workPhone: '234-222-3333', 
        email: 'jane.smith@example.com', 
        country: 'Canada', 
        address: '456 Elm St, City B, Canada', 
        postalCode: 'M5H 2N2' 
    },
    { 
        name: 'Alex Brown', 
        relationship: 'Sibling', 
        phone: '345-678-9012', 
        workPhone: '345-333-4444', 
        email: 'alex.brown@example.com', 
        country: 'United Kingdom', 
        address: '789 Maple St, City C, United Kingdom', 
        postalCode: 'W1A 1AA' 
    },
    { 
        name: 'Sarah Lee', 
        relationship: 'Spouse', 
        phone: '456-789-0123', 
        workPhone: '456-444-5555', 
        email: 'sarah.lee@example.com', 
        country: 'Australia', 
        address: '101 Pine St, City D, Australia', 
        postalCode: '2000' 
    },
    { 
        name: 'David White', 
        relationship: 'Friend', 
        phone: '567-890-1234', 
        // workPhone: '567-555-6666', 
        email: 'david.white@example.com', 
        country: 'Germany', 
        address: '202 Oak St, City E, Germany', 
        postalCode: '10115' 
    },
    { 
        name: 'Emily Clark', 
        relationship: 'Cousin', 
        phone: '678-901-2345', 
        // workPhone: '678-666-7777',
        email: 'emily.clark@example.com', 
        country: 'France', 
        address: '303 Birch St, City F, France', 
        postalCode: '75001' 
    }
  ];


  displayedColumns: string[] = ['name', 'relationship', 'phone', 'email', 'country', 'address', 'postalCode', 'actions'];
  dataSource = this.ELEMENT_DATA;

  editEmergencyContact(contact: any): void {
    const dialogRef = this.dialog.open(AddEmergencyConatctModalComponent, {
      width: '600px', // Adjust the width as needed
      data: { ...contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if needed, e.g., update the table data
      }
    });
  }

}
