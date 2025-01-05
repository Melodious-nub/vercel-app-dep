import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentModalComponent } from './add-document-modal/add-document-modal.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-documents-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.scss']
})
export class DocumentsFormComponent {

  constructor(private dialog: MatDialog, private api: DataService, private snackbar: MatSnackBar) { }

  openDocModal() {
    const dialogRef = this.dialog.open(AddDocumentModalComponent, {
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

  // for table
  ELEMENT_DATA: any[] = [
    { fileName: 'https://dummyimage.com/300x200/000/ffff', description: 'This is a test note.', uploadDate: '2023-01-01', uploadedBy: 'John Doe', sharedWith: 'Everyone', status: 'Completed' },
    { fileName: 'https://dummyimage.com/300x200/000/fff', description: 'This is a test note.', uploadDate: '2023-01-05', uploadedBy: 'Jane Smith', sharedWith: 'Team Manager', status: 'Pending' },
    { fileName: 'https://dummyimage.com/300x200/000/fff', description: 'This is a test note.', uploadDate: '2023-02-12', uploadedBy: 'Alex Brown', sharedWith: 'Direct Manager', status: 'Completed' },
    { fileName: 'https://dummyimage.com/300x200/000/fff', description: 'This is a test note.', uploadDate: '2023-03-18', uploadedBy: 'David White', sharedWith: 'Everyone', status: 'In Progress' },
    { fileName: 'https://dummyimage.com/300x200/000/ffft', description: 'This is a test note.', uploadDate: '2023-04-22', uploadedBy: 'Sarah Lee', sharedWith: 'Selected Users', status: 'Completed' },
    { fileName: 'https://dummyimage.com/300x200/000/fff', description: 'This is a test note.', uploadDate: '2023-05-30', uploadedBy: 'John Doe', sharedWith: 'Everyone', status: 'Pending' }
  ];

  displayedColumns: string[] = ['fileName', 'description', 'upload_date', 'uploaded_by', 'shared_with', 'status', 'actions'];
  dataSource = this.ELEMENT_DATA;

}
