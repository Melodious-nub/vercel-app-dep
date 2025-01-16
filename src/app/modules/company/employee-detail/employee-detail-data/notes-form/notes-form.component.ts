import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { AddNotesModalComponent } from './add-notes-modal/add-notes-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface DataRow {
  date: Date;
  // createdBy: string;
  note: string;
  document: string
}

@Component({
  selector: 'vex-notes-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss']
})
export class NotesFormComponent implements OnInit {
  // for table data
  dataSource: any;
  // selection = new SelectionModel<DataRow>(true, []);
  employeeId: any;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private api: DataService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id')!;
      this.fetchAllNotes();
    });
  }

  openAddNoteDialog(): void {
    const dialogRef = this.dialog.open(AddNotesModalComponent, {
      width: '600px',
      disableClose: true,
      data: { employeeId: this.employeeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        // console.log('Dialog result:', result);
        this.fetchAllNotes();
      }
    });
  }

  // createData(): DataRow[] {
  //   return [
  //     {
  //       date: new Date(), note: 'Lorem ipsum dolor, sit', document: 'https://dummyimage.com/300x200/000/fff'
  //     }
  //   ];
  // }

  updateCustomer(row: DataRow) {
    console.log('Update Customer:', row);
  }

  deleteCustomer(row: DataRow) {
    console.log('Delete Customer:', row);
  }

  fetchAllNotes() {
    this.api.getAllNotes(this.employeeId).subscribe({
      next: (res) => {
        this.dataSource = res.content;
        console.log(res);
      },
      error: () => {
        this.snackbar.open('Server error. Please try again.', 'Close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom' });
      }
    });
  }

}
