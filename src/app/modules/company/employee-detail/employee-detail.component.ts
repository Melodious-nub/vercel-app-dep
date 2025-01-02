import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { debounceTime } from 'rxjs';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { EmployeeDetailMenuComponent } from "./employee-detail-menu/employee-detail-menu.component";
import { EmployeeDetailDataComponent } from "./employee-detail-data/employee-detail-data.component";
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'vex-employee-detail',
  standalone: true,
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSidenavModule,
    EmployeeDetailMenuComponent,
    EmployeeDetailDataComponent,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule,
  ],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employeeId!: string;
  employeeDetails!: any; // Define the type for employee details
  image: any;

  constructor(private route: ActivatedRoute, private router: Router, private api: DataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id')!;
      this.getEmployeeDetails(); // Fetch employee details using the ID
    });
  }

  // Method to fetch employee details
  getEmployeeDetails(): void {
    // Retrieve the employee data from the state
    this.employeeDetails = history.state.data;

    this.api.getEmployeeImage(this.employeeId).subscribe(res => {
      if (res && res.image) {
        // Prefix the base64 string with the appropriate data URL
        this.image = 'data:image/jpeg;base64,' + res.image;
        // console.log(res);
      }
    })

    if (!this.employeeDetails) {
      console.error('No employee data passed to the component.');
    }
  }

  searchCtrl = new UntypedFormControl();

  searchStr$ = this.searchCtrl.valueChanges.pipe(debounceTime(10));

  menuOpen = false;
  selectedMenu: any;

  setData(data: any) {
    // console.log(data, 'test')
    this.selectedMenu = data;
    this.menuOpen = false;
  }

  openMenu() {
    this.menuOpen = true;
  }

  companyRoute() {
    this.router.navigate(['dashboard/company']);
  }

}
