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
    employeeId: '',
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
  isEditMode: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddCompensationModalComponent>, private api: DataService, private destroyRef: DestroyRef, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.employeeId) {
      this.form = {
        employeeId: data.employeeId,
        paymentDate: data.paymentDate || '',
        compensationType: data.compensationType || '',
        amount: data.amount || '',
        currencyId: data.currencyId || '',
        comments: data.comments || '',
        reason: data.reason || '',
        payPeriod: data.payPeriod || ''
      };
      this.isEditMode = !!data.id; // Check if it's edit mode
    }
  }

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

  onSave(form: any): void {
    if (form.valid) {
      const reqBody = {
        employeeId: JSON.parse(this.form.employeeId),
        paymentDate: this.formatDate(this.form.paymentDate),
        compensationType: this.form.compensationType,
        amount: this.form.amount,
        currencyId: this.form.currencyId,
        comments: this.form.comments,
        reason: this.form.reason,
        payPeriod: this.form.payPeriod
      };

      const apiCall = this.isEditMode
        ? this.api.updateCompensation(this.data.id, reqBody) // Pass the ID for update
        : this.api.createCompensation(reqBody);

      const subscription = apiCall.subscribe({
        next: () => {
          this.snackbar.open(
            this.isEditMode ? 'Compensation updated' : 'Compensation created',
            'Close',
            { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' }
          );
        },
        error: () => {
          this.snackbar.open('Server error...', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
        },
        complete: () => {
          this.dialogRef.close(true); // Pass the updated/created compensation data
        },
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
