import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatFormFieldModule } from '@angular/material/form-field';
import { stagger20ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '@vex/animations/scale-fade-in.animation';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Contact } from 'src/app/pages/apps/contacts/interfaces/contact.interface';
import { EmployeeMenu } from '../employee-detail-menu/employee-detail-menu.component';
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { PersonalFormComponent } from "./personal-form/personal-form.component";
import { NotesFormComponent } from "./notes-form/notes-form.component";
import { DocumentsFormComponent } from "./documents-form/documents-form.component";
import { AssetsFormComponent } from "./assets-form/assets-form.component";
import { TrainingFormComponent } from "./training-form/training-form.component";
import { EmergencyContactsFormComponent } from "./emergency-contacts-form/emergency-contacts-form.component";
import { TasksFormComponent } from "./tasks-form/tasks-form.component";
import { OnboardingFormComponent } from "./onboarding-form/onboarding-form.component";
import { ReportsFormComponent } from "./reports-form/reports-form.component";
import { TimeOffFormComponent } from "./time-off-form/time-off-form.component";
import { CompensationFormComponent } from "./compensation-form/compensation-form.component";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'vex-employee-detail-data',
  standalone: true,
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline'
      } as MatFormFieldDefaultOptions
    }
  ],
  animations: [stagger20ms, fadeInUp400ms, scaleFadeIn400ms],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    NgIf,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    EmployeeFormComponent,
    PersonalFormComponent,
    NotesFormComponent,
    DocumentsFormComponent,
    AssetsFormComponent,
    TrainingFormComponent,
    EmergencyContactsFormComponent,
    TasksFormComponent,
    OnboardingFormComponent,
    ReportsFormComponent,
    TimeOffFormComponent,
    CompensationFormComponent,
    FormsModule
  ],
  templateUrl: './employee-detail-data.component.html',
  styleUrls: ['./employee-detail-data.component.scss']
})
export class EmployeeDetailDataComponent implements OnInit, OnChanges, AfterViewInit {
  onFileSelected($event: Event) {
    throw new Error('Method not implemented.');
  }
  // @Input({ required: true }) data!: any;
  // @Input({ required: true }) columns!: TableColumn<any>[];
  // @Input() pageSize = 20;
  // @Input() pageSizeOptions = [10, 20, 50];
  // @Input() searchStr: string = '';

  // @Output() toggleStar = new EventEmitter<Contact['id']>();
  // @Output() openContact = new EventEmitter<Contact['id']>();

  // visibleColumns: Array<keyof any | string> = [];
  // dataSource = new MatTableDataSource<any>();

  // @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort?: MatSort;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['columns']) {
    //   this.visibleColumns = this.columns.map((column) => column.property);
    // }

    // if (changes['data']) {
    //   this.dataSource.data = this.data;
    // }

    // if (changes['searchStr']) {
    //   this.dataSource.filter = (this.searchStr || '').trim().toLowerCase();
    // }
  }

  emitToggleStar(event: Event, id: Contact['id']) {
    // event.stopPropagation();
    // this.toggleStar.emit(id);
  }

  ngAfterViewInit() {
    // if (this.paginator) {
    //   this.dataSource.paginator = this.paginator;
    // }
    // if (this.sort) {
    //   this.dataSource.sort = this.sort;
    // }
  }

  @Input() selectedForm: any;

  onFilterChange(id: EmployeeMenu['id']) {
    this.selectedForm = id;
  }
  // menuItems = [
  //   { id: 'employee', label: 'Employee', type: 'link' },
  //   { id: 'personal', label: 'Personal', type: 'link' },
  //   { id: 'documents', label: 'Documents', type: 'link' },
  //   // add other menu items
  // ];

  // onMenuSelect(menuId: EmployeeMenu['id']) {
  //   this.selectedForm = menuId;
  // }

  employeeId!: string;
  // @Input() employeeDetails!: any; // Define the type for employee details
  // // Separate property to hold the image file
  // profilePic: string | null = null; // To store the selected image name

  // variables
  positions: string[] = [];
  teams = ['Team A', 'Team B', 'Team C'];
  locations = ['Location 1', 'Location 2', 'Location 3'];
  holidayGroups = ['Group 1', 'Group 2', 'Group 3'];

}
