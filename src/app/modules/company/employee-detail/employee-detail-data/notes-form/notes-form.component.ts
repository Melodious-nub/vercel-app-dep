import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { AddNotesModalComponent } from './add-notes-modal/add-notes-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

interface DataRow {
  date: Date;
  createdBy: string;
  note: string;
  document: string
}

@Component({
  selector: 'vex-notes-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss']
})
export class NotesFormComponent {
  // for table data
  dataSource = new MatTableDataSource<DataRow>(this.createData());
  selection = new SelectionModel<DataRow>(true, []);
  
  constructor(private dialog: MatDialog) {}

  openAddNoteDialog(): void {
    const dialogRef = this.dialog.open(AddNotesModalComponent, {
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

  createData(): DataRow[] {
    return [
      {
        date: new Date(), createdBy: 'Shawon talukder', note: 'Lorem ipsum dolor, sit', document: 'https://dummyimage.com/300x200/000/fff'
      },
      {
        date: new Date(), createdBy: 'Imran sarker', note: 'this is a test note for developer', document: 'https://dummyimage.com/400x300/00ff00/000'
      },
      {
        date: new Date(), createdBy: 'Imran sarker', note: 'this is a test note for dev.', document: 'https://dummyimage.com/400x300/00ff00/000'
      },
      {
        date: new Date(), createdBy: 'Moniruzzamn', note: 'this is a test note for dev.', document: 'https://dummyimage.com/400x300/00ff00/000'
      },
      {
        date: new Date(), createdBy: 'Anders Sti', note: 'this is a test note for dev.', document: 'https://dummyimage.com/400x300/00ff00/000'
      },
      {
        date: new Date(), createdBy: 'Anders Sti', note: 'this is a test note for dev.', document: 'https://dummyimage.com/400x300/00ff00/000'
      },
    ];
  }

  updateCustomer(row: DataRow) {
    console.log('Update Customer:', row);
  }

  deleteCustomer(row: DataRow) {
    console.log('Delete Customer:', row);
  }

}
