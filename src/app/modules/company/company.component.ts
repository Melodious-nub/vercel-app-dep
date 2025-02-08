import { Component, DestroyRef, OnInit } from '@angular/core';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from '../../pages/apps/contacts/interfaces/contact.interface';
import { trackById } from '@vex/utils/track-by';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '@vex/animations/scale-fade-in.animation';
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
import { debounceTime, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EmployeeCardComponent,
    MATERIAL_IMPORTS
  ]
})
export class CompanyComponent implements OnInit {
  employeesList: any[] = [];
  allDepartments: any[] = [];
  designationByDept: any[] = [];
  searchCtrl = new FormControl('');
  filteredEmployees: any[] = [];
  departmentId = new FormControl('');

  trackById = trackById;

  constructor(
    private dialog: MatDialog,
    private api: DataService,
    private destroyRef: DestroyRef,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchAllEmployee();
    this.fetchDepartment();

    this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((res) => {
      if (!res) {
        this.filteredEmployees = [...this.employeesList]; // Reset when empty
      } else {
        this.filteredEmployees = this.employeesList.filter((data) =>
          data.name.toLowerCase().includes(res.toLowerCase())
        );
      }
    });
  }

  // Fetch all departments
  fetchDepartment() {
    const subscription = this.api.getAllDepartments().subscribe({
      next: (res) => {
        this.allDepartments = res;
        // this.onDepartmentChange();
      },
      error: () => {
        this.snackbar.open('Failed to load departments. Please try again.', 'Close', { duration: 3000 });
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  // Fetch designations by department
  fetchDesignationByDept(departmentId: number) {
    this.api.getDesignationByDepartment(departmentId).subscribe({
      next: (res) => {
        this.designationByDept = res;
      },
      error: () => {
        this.snackbar.open('Failed to load designations. Please try again.', 'Close', { duration: 3000 });
      }
    });
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
        this.employeesList = response.content.map((employee: any) => ({
          ...employee,
          image: `${employee.image}&timestamp=${new Date().getTime()}`
        }));
        this.filteredEmployees = [...this.employeesList]; // Initialize with all employees
      },
      error: (error) => {
        console.log(error, 'error log');
      }
    });
  }

  onDepartmentChange(department: { id: number; name: string }) {
    if (!department) {
      this.filteredEmployees = [...this.employeesList]; // Reset employee list
      this.designationByDept = []; // Clear designations
      return;
    }

    // console.log('Selected Department:', department);

    // 🔹 Filter employees by department name (same as before)
    this.filteredEmployees = this.employeesList.filter((data) => data.department === department.name);

    // 🔹 Fetch designations by department ID
    this.fetchDesignationByDept(department.id);
  }

  onDesignationChange(designation: string) {
    if (!designation) {
      this.filteredEmployees = [...this.employeesList]; // Reset employee list
      this.designationByDept = []; // Clear designations
      return;
    }

    // console.log('Selected Department:', department);

    // 🔹 Filter employees by department name (same as before)
    this.filteredEmployees = this.employeesList.filter((data) => data.designation === designation);
  }
}