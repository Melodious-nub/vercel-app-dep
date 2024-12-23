import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTrainingModalComponent } from './add-new-training-modal/add-new-training-modal.component';

@Component({
  selector: 'vex-training-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent {

  constructor(private dialog: MatDialog) {}

  openAddTraining() {
    const dialogRef = this.dialog.open(AddNewTrainingModalComponent, {
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

}
