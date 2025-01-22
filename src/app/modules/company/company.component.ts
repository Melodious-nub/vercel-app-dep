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
  employeesList: any = [];

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
  ) { }

  ngOnInit() {
    this.fetchAllEmployee();
  }

  // @ViewChild('openDialogButton') openDialogButton!: ElementRef

  openContact(id?: Contact['id']) {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '700px',
      disableClose: true,
      restoreFocus: false,
      // data: { refreshEmployees: this.fetchAllEmployee.bind(this) },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Focus on the button or element that opens the dialog
      this.fetchAllEmployee();
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
    this.api.getAllEmployee().subscribe({
      next: (response) => {
        // Add cache-busting query parameter to the image URL
        this.employeesList = response.content.map((employee: any) => {
          return {
            ...employee,
            image: `${employee.image}&timestamp=${new Date().getTime()}` // Add timestamp
          };
        });
      },
      error: (error) => {
        console.log(error, 'error log');
      }
    });
  }
}