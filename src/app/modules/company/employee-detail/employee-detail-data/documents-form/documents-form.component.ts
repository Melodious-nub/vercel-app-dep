import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentModalComponent } from './add-document-modal/add-document-modal.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

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
export class DocumentsFormComponent implements OnInit {
  employeeId: any;

  constructor(private dialog: MatDialog, private api: DataService, private snackbar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id')!;
      this.fetchAllDocuments();
    });
  }

  openDocModal() {
    const dialogRef = this.dialog.open(AddDocumentModalComponent, {
      width: '600px',
      disableClose: true,
      data: { employeeId: this.employeeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        // console.log('Dialog result:', result);
        this.fetchAllDocuments();
      }
    });
  }

  // for table
  ELEMENT_DATA: any[] = [];

  displayedColumns: string[] = ['file', 'description', 'uploaded_by', 'categoryname', 'actions'];
  // dataSource = this.ELEMENT_DATA;

  fetchAllDocuments() {
    this.api.getAllDocuments().subscribe({
      next: (res) => {
        this.ELEMENT_DATA = res.content;
        console.log(res.content);
      },
      error: () => {
        this.snackbar.open('Server error. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

}
