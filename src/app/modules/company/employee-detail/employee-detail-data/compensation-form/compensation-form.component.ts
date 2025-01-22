import { Component, DestroyRef, OnInit } from '@angular/core';
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
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs';

@Component({
  selector: 'vex-compensation-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
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
  dataSource: any[] = [];

  currencyList: any[] = []

  fetchCurrencies() {
    const subscription = this.api.getCurrencies().subscribe({
      next: (res) => {
        this.currencyList = res;
      },
      error: err => console.log(err)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  getCurrencyIcon(currencyId: number): string {
    const currency = this.currencyList.find((item: any) => item.id === currencyId);
    if (currency) {
      // Extract the icon (e.g., $) from the displayValue
      const match = currency.displayValue.match(/\((.*?)\)/);
      return match ? match[1] : ''; // Return the icon if found
    }
    return ''; // Return empty string if no match
  }

  displayedColumns: string[] = ['dates', 'amount', 'type', 'reason', 'comments', 'actions'];

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, public dialog: MatDialog, private api: DataService, private destroyRef: DestroyRef) {
    this.fetchCurrencies();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id')!;
    });

    this.fetchCompensation();
  }

  fetchCompensation() {
    const subscription = this.api.getCompensation().pipe(
      map((response) => response.content.filter((item: any) => item.employeeId === JSON.parse(this.employeeId)))
    ).subscribe({
      next: (filteredData) => this.dataSource = filteredData, // This will log only the filtered data
      error: (err) => console.error('Error fetching compensation:', err),
      complete: () => console.log('Compensation data fetched successfully.')
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }


  // open add compensation modal
  addCompensation() {
    const dialogRef = this.dialog.open(AddCompensationModalComponent, {
      width: '600px',
      disableClose: true,
      data: this.employeeId
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
      ...this.dataSource.map(item => [
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
