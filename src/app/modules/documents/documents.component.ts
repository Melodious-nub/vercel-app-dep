import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsFormComponent } from "../company/employee-detail/employee-detail-data/documents-form/documents-form.component";
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddDocumentModalComponent } from '../company/employee-detail/employee-detail-data/documents-form/add-document-modal/add-document-modal.component';

@Component({
  selector: 'vex-documents',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
    MatSnackBarModule,
    DocumentsFormComponent
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  isGlobalDoc: boolean = true;
  selectedEmployeeName: string = '';

}
