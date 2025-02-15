import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { AddEmergencyConatctModalComponent } from './add-emergency-conatct-modal/add-emergency-conatct-modal.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vex-emergency-contacts-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './emergency-contacts-form.component.html',
  styleUrls: ['./emergency-contacts-form.component.scss']
})
export class EmergencyContactsFormComponent implements OnInit {
  @Input({ required: true }) selectedEmployeeName: string = '';
  employeeId: any;

  constructor(private dialog: MatDialog, private api: DataService, private destroyRef: DestroyRef, private snackbar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id')!;
      this.fetchEmergencyContact();
    });
  }

  openEmergencyContactModal() {
    const dialogRef = this.dialog.open(AddEmergencyConatctModalComponent, {
      width: '600px',
      disableClose: true,
      data: { employeeName: this.selectedEmployeeName, employeeId: this.employeeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        // console.log('Dialog result:', result);
        this.fetchEmergencyContact();
      }
    });
  }

  // for table
  dataSource: any[] = [];
  fetchEmergencyContact() {
    const subscription = this.api.getAllEmergencyContact().pipe(
      map((res) => {
        const data: any[] = res.content;
        return data.filter(emp => Number(this.employeeId) === emp.employeeId);
      }),
    ).subscribe({
      next: (res) => {
        this.dataSource = res;
      },
      error: err => console.log(err)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  displayedColumns: string[] = ['name', 'relationship', 'phone', 'email', 'country', 'address', 'postalCode', 'actions'];

  editEmergencyContact(contact: any): void {
    const dialogRef = this.dialog.open(AddEmergencyConatctModalComponent, {
      width: '600px', // Adjust the width as needed
      data: { ...contact, employeeName: this.selectedEmployeeName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if needed, e.g., update the table data
        this.fetchEmergencyContact();
      }
    });
  }

  deleteEmContact(id: any) {
    // console.log(id);

    const subscription = this.api.deleteEmergencyContact(id).subscribe({
      next: () => {
        this.snackbar.open('Emergency contact deleted', 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      },
      error: () => {
        this.snackbar.open('Server error...', 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      },
      complete: () => {
        this.fetchEmergencyContact();
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

}
