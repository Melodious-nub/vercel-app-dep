import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-add-emergency-conatct-modal',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './add-emergency-conatct-modal.component.html',
  styleUrls: ['./add-emergency-conatct-modal.component.scss']
})
export class AddEmergencyConatctModalComponent implements OnInit {
  contact: any;
  countryControl = new FormControl();
  countries: any[] = [];
  isEditMode: boolean = false; // Tracks if modal is in edit mode

  // filteredCountries!: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<AddEmergencyConatctModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: DataService,
    private snackbar: MatSnackBar,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit() {
    // Initialize form with the received data
    this.contact = this.data ? { ...this.data } : {};
    this.isEditMode = !!this.data; // Determine if editing

    this.fetchCountries();
  }

  fetchCountries() {
    this.api.getAllCountries().subscribe(res => {
      this.countries = res;
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(form: any): void {
    if (form.valid) {
      const contactData = form.value;

      // Call the appropriate API based on the mode
      const apiCall = this.isEditMode
        ? this.api.updateEmergencyContact(this.contact.id, contactData) // Pass the ID for update
        : this.api.createEmergencyContact(contactData);

      const subscription = apiCall.subscribe({
        next: () => {
          this.snackbar.open(
            this.isEditMode ? 'Emergency contact updated' : 'Emergency contact created',
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
          this.dialogRef.close(true); // Pass the updated/created contact data
        },
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  // Handle country selection from autocomplete
  onCountrySelected(event: any) {
    this.countryControl.setValue(event.option.value);
  }

}
