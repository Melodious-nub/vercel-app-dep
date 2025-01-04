import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatDialog } from '@angular/material/dialog';
import { AddChildrenModalComponent } from './add-children-modal/add-children-modal.component';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Children {
  name: string;
  birthDate: Date;
  gender: string;
}

@Component({
  selector: 'vex-personal-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent implements OnInit {
  employeeId: any;
  personalForm: any = [];
  locations: any[] = [];

  constructor(public dialog: MatDialog, private api: DataService, private route: ActivatedRoute, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id')!;
      // this.getEmployeeDetails();
    });

    this.fetchCountries();
  }

  fetchCountries() {
    this.api.getAllCountries().subscribe(res => {
      this.locations = res;
    })

    this.fetchPersonalData();
  }

  // for positions
  childrens: Children[] = [
    // { name: 'Children 1', birthDate: new Date('2022-10-6'), gender: 'MALE' },
  ];

  openChildrenModal(): void {
    const dialogRef = this.dialog.open(AddChildrenModalComponent, {
      width: '400px',
      disableClose: true,
      data: { name: '', birthDate: '', gender: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.childrens.push(result);
      }
    });
  }

  isButtonClicked: boolean = false;
  onSave() {
    // for formating date format
    const birthDate = this.personalForm.birthDate ? new Date(this.personalForm.birthDate).toLocaleDateString('en-CA') : '';
    const formattedChildrens = this.childrens.map(child => ({
      ...child,
      birthDate: new Date(child.birthDate).toLocaleDateString('en-CA') // Format each child's birthDate
    }));

    const reqBody = {
      birthDate: birthDate, street: this.personalForm.street, city: this.personalForm.city, state: this.personalForm.state, countryId: this.personalForm.countryId, nationality: this.personalForm.nationality, homePhone: this.personalForm.homePhone, mobilePhone: this.personalForm.mobilePhone, personalEmail: this.personalForm.personalEmail, gender: this.personalForm.gender, maritalStatus: this.personalForm.maritalStatus, personalIdentificationNumber: this.personalForm.personalIdentificationNumber, taxReferenceNumber: this.personalForm.taxReferenceNumber, children: formattedChildrens, eid: this.employeeId
    }

    console.log(reqBody);

    this.api.saveEmployeePersonal(reqBody).subscribe({
      next: (res) => {
        // this.allDepartments = res;
        console.log(res);
        this.snackbar.open('Personal data saved successfully.', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackbar.open('Server error. Please try again.', 'Close', { duration: 3000 });
      }
    });

  }

  fetchPersonalData() {
    this.api.getPersonalData(this.employeeId).subscribe({
      next: (res) => {
        // this.allDepartments = res;
        console.log(res);
        this.personalForm = res;
        this.childrens = res.children;
        // this.snackbar.open('Personal data saved successfully.', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackbar.open('Server error. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

}
