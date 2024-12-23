import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { employeeData } from 'src/static-data/employees';
import { AddCompensationModalComponent } from './add-compensation-modal/add-compensation-modal.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'vex-compensation-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './compensation-form.component.html',
  styleUrls: ['./compensation-form.component.scss']
})
export class CompensationFormComponent implements OnInit {
  employeeId!: string;
  employeeDetails!: any; // Define the type for employee details

  // for table
  ELEMENT_DATA: any[] = [
    { dates: '2023-01-01', amount: 500, type: 'Salary', reason: 'Promotion', comments: 'test' },
    { dates: '2023-01-01', amount: 500, type: 'Bonus', reason: '', comments: 'Eid bonus' },
    { dates: '2023-01-01', amount: 500, type: 'Salary', reason: 'Annual salary increase', comments: 'test' },
    { dates: '2023-01-01', amount: 500, type: 'Salary', reason: 'Promotion', comments: 'test' },
    { dates: '2023-01-01', amount: 500, type: 'Bonus', reason: '', comments: 'no comments' },
    { dates: '2023-01-01', amount: 500, type: 'Bonus', reason: '', comments: 'test' }
  ];

  displayedColumns: string[] = ['dates', 'amount', 'type', 'reason', 'comments', 'actions'];
  dataSource = this.ELEMENT_DATA; 

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id')!;
      this.getEmployeeDetails(); // Fetch employee details using the ID
    });
  }

  // Method to fetch employee details
  getEmployeeDetails(): void {
    const employeeIdNum = Number(this.employeeId); // Convert to number if ID is numeric
    this.employeeDetails = employeeData.find((employee: any) => employee.id === employeeIdNum)!;
    
    if (!this.employeeDetails) {
      console.error('Employee not found');
    }
  }

  // open add compensation modal
  addCompensation() {
    const dialogRef = this.dialog.open(AddCompensationModalComponent, {
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

  // for download as excel
  exportToExcel(): void {
    // Define the file name and sheet name
    const fileName = 'CompensationData.xlsx';
    const sheetName = 'Compensation';

    // Prepare the data array with headers
    const excelData = [
      ['Dates', 'Amount', 'Type', 'Reason', 'Comments'], // Header row
      ...this.ELEMENT_DATA.map(item => [
        item.dates,
        item.amount,
        item.type,
        item.reason || 'Not available', // Default text if reason is empty
        item.comments
      ])
    ];

    // Create a workbook and add the worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(excelData);
    const workbook: XLSX.WorkBook = { Sheets: { [sheetName]: worksheet }, SheetNames: [sheetName] };

    // Export the file
    XLSX.writeFile(workbook, fileName);
  }

}
