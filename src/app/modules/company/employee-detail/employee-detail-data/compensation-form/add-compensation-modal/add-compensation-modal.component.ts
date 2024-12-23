import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'vex-add-compensation-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-compensation-modal.component.html',
  styleUrls: ['./add-compensation-modal.component.scss']
})
export class AddCompensationModalComponent implements OnInit {
  currencyControl = new FormControl();
  typeControl = new FormControl();
  payPeriodControl = new FormControl('Monthly');
  reasonControl = new FormControl('Annual salary increase'); // Default selection
  filteredCurrencies!: Observable<string[]>;

  // List of common world currencies
  currencies: string[] = [
    'USD - United States Dollar',
    'EUR - Euro',
    'JPY - Japanese Yen',
    'GBP - British Pound Sterling',
    'AUD - Australian Dollar',
    'CAD - Canadian Dollar',
    'CHF - Swiss Franc',
    'CNY - Chinese Yuan',
    'SEK - Swedish Krona',
    'NZD - New Zealand Dollar',
    // Add more currencies as needed
  ];

  constructor(public dialogRef: MatDialogRef<AddCompensationModalComponent>) {}

  ngOnInit() {
    this.filteredCurrencies = this.currencyControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this.filterCurrencies(value || ''))
    );
  }

  private filterCurrencies(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.currencies.filter(currency =>
      currency.toLowerCase().includes(filterValue)
    );
  }

  onSave(): void {
    // Logic to save the note with attachment data if available
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
