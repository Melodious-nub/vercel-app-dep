import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-add-compensation-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-compensation-modal.component.html',
  styleUrls: ['./add-compensation-modal.component.scss']
})
export class AddCompensationModalComponent implements OnInit {
  form: any = {
    employeeId: this.empId,
    paymentDate: '',
    compensationType: '',
    amount: '',
    currencyId: '',
    comments: '',
    reason: '',
    payPeriod: ''
  }

  // List of common world currencies
  currencies: any[] = [];

  constructor(public dialogRef: MatDialogRef<AddCompensationModalComponent>, private api: DataService, private destroyRef: DestroyRef, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public empId: any) { }

  ngOnInit() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    const subscription = this.api.getCurrencies().subscribe({
      next: (res) => {
        this.currencies = res;
      },
      error: err => console.log(err)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  private formatDate(date: any): string {
    return date ? new Date(date).toLocaleDateString('en-CA') : ''; // Format as 'YYYY-MM-DD'
  }

  onSave(): void {
    const reqBody = {
      employeeId: JSON.parse(this.empId),
      paymentDate: this.formatDate(this.form.paymentDate),
      compensationType: this.form.compensationType,
      amount: this.form.amount,
      currencyId: this.form.currencyId,
      comments: this.form.comments,
      reason: this.form.reason,
      payPeriod: this.form.payPeriod
    }

    // console.log(reqBody);

    const subscription = this.api.createCompensation(reqBody).subscribe({
      next: (res) => {
        this.snackbar.open(res, 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        })
      },
      error: (err) => {
        // console.log(err);

        this.snackbar.open('Server error...', 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      },
      complete: () => this.dialogRef.close(true)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
