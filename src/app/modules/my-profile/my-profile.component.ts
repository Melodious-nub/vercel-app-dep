import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { MatDialog } from '@angular/material/dialog';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';

@Component({
  selector: 'vex-my-profile',
  standalone: true,
  animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  aboutData: any = {
    name: 'David Smith',
    phone: '+1 (930) 502-3182',
    email: 'david.smith@example.com',
    companyName: 'Example Company',
    designation: 'Software Engineer',
    previousCompany: 'Hotstuff',
    previousCompanyDesignation: 'Web Developer',
    WorkHour: '9am-5pm',
    address: 'Gulshan 2, Dhaka-1212, Bangladesh',
    facebookUrl: 'facebook.com/david-smith',
    linkeDinUrl: 'linkedin.com/in/david-smith',
    skypeUrl: ''
  }

  constructor(private dialog: MatDialog) {}

  openmyProfileModal() {
    const dialogRef = this.dialog.open(EditMyProfileComponent, {
      width: '650px',
      disableClose: true,
      data: this.aboutData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        // console.log('Dialog result:', result);
      }
    });
  }
 
}
