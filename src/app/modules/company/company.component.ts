import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from '../../pages/apps/contacts/interfaces/contact.interface';
import { trackById } from '@vex/utils/track-by';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '@vex/animations/scale-fade-in.animation';
import { ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeCardComponent } from "./employee-card/employee-card.component";
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'vex-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ],
  standalone: true,
  imports: [
    MatIconModule,
    MatTabsModule,
    NgFor,
    MatButtonModule,
    MatTooltipModule,
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EmployeeCardComponent
]
})
export class CompanyComponent implements OnInit {
  employeesList:any = [];

  // links: Link[] = [
  //   {
  //     label: 'All Contacts',
  //     route: '../all'
  //   },
  //   {
  //     label: 'Frequently Contacted',
  //     route: '../frequent'
  //   },
  //   {
  //     label: 'Starred',
  //     route: '../starred'
  //   }
  // ];

  trackById = trackById;

  constructor(
    private dialog: MatDialog,
    private api: DataService,
  ) {}

  ngOnInit() {
    this.fetchAllEmployee();
  }

  @ViewChild('openDialogButton') openDialogButton!: ElementRef

  openContact(id?: Contact['id']) {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '700px',
      disableClose: true,
      restoreFocus: false,
      data: { refreshEmployees: this.fetchAllEmployee.bind(this) },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Focus on the button or element that opens the dialog
      this.openDialogButton.nativeElement.focus();
      // console.log('after modal closed');
    });
  }

  // toggleStar(id: Contact['id']) {
  //   const contact = contactsData.find((c) => c.id === id);

  //   if (contact) {
  //     contact.starred = !contact.starred;
  //   }
  // }

  toppings = new FormControl('');

  toppingList: string[] = ['Java team', 'Management team', 'Angular team', 'SQA team', 'Marketing team', 'DevOps team'];

  fetchAllEmployee() {
    // this.api.getAllEmployee().subscribe({
    //   next: (response) => {
    //     this.employeesList = response;
    //     // console.log('employee list called', this.employeesList);
    //   },
    //   error: (error) => {
    //     console.log(error, 'error log');
    //   }
    // });
    this.employeesList = [
      {
          "id": "1",
          "name": "Shawon",
          "phone": "01717876545",
          "designation": "Software Developer",
          "email": "shawon@gmail.com",
          "startDate": "2024-10-10"
      },
      {
          "id": "2",
          "name": "Shawon",
          "phone": "01717876545",
          "designation": "Software Developer",
          "email": "shawon@gmail.com",
          "startDate": "2024-10-10"
      },
      {
          "id": "3",
          "name": "string",
          "phone": "string",
          "designation": "string",
          "email": "string",
          "startDate": "2024-11-29"
      },
      {
          "id": "4",
          "name": "Hudai",
          "phone": "01717876545",
          "designation": "Ui",
          "email": "shawon@gmail.com",
          "startDate": "2024-10-10"
      },
      {
          "id": "5",
          "name": "Hudai",
          "phone": "01717876545",
          "designation": "Ui",
          "email": "shawon@gmail.com",
          "startDate": "2024-10-10"
      },
      {
          "id": "6",
          "name": "Dummy account 1",
          "phone": "018364634573",
          "designation": "None",
          "email": "string@string.com",
          "startDate": "2024-10-10"
      },
      {
          "id": "7",
          "name": "Test 10",
          "phone": "82636455346",
          "designation": "Test de",
          "email": "test@test.com",
          "startDate": "2024-11-30"
      },
      {
          "id": "8",
          "name": "Test 11",
          "phone": "82636455346",
          "designation": "Test de",
          "email": "test@test.com",
          "startDate": "2024-11-30"
      },
      {
          "id": "9",
          "name": "Test 12",
          "phone": "12534235126",
          "designation": "Test de",
          "email": "test@test.com",
          "startDate": "2024-12-02"
      },
      {
          "id": "10",
          "name": "Kashem Talukder",
          "phone": "01686346809",
          "designation": "Engineer",
          "email": "shawon@sumations.com",
          "startDate": "2024-12-02"
      },
      {
          "id": "11",
          "name": "Kashem Talukder 4",
          "phone": "87435482794",
          "designation": "Engineer",
          "email": "shawon@sumations.com",
          "startDate": "2024-12-01"
      },
      {
          "id": "12",
          "name": "Test 2.0",
          "phone": "864634245526",
          "designation": "Engineer",
          "email": "shawon@sumations.com",
          "startDate": "2024-11-30"
      },
      {
          "id": "13",
          "name": "Kashem Talukder 8",
          "phone": "8654368736",
          "designation": "Engineer",
          "email": "shawon@sumations.com",
          "startDate": "2024-11-30"
      }];
  }
}