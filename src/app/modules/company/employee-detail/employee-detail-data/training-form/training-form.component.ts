import { Component, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTrainingModalComponent } from './add-new-training-modal/add-new-training-modal.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-training-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent implements OnInit {
  dataSource: any[] = []; // Ensure dataSource is an array

  constructor(private dialog: MatDialog, private destroyRef: DestroyRef, private api: DataService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchTrainingData();
  }

  fetchTrainingData(): void {
    const subscription = this.api.getAllTraining().subscribe({
      next: (res) => this.dataSource = res.content,
      error: err => console.log(err)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  openAddTraining() {
    const dialogRef = this.dialog.open(AddNewTrainingModalComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        // console.log('Dialog result:', result);
        this.fetchTrainingData();
      }
    });
  }

  delete(row: any) {
    // Handle the deletion of the row data
    const trainingId = JSON.stringify(row);
    console.log('Deleting row:', trainingId);
    // Add your deletion logic here
    const subscription = this.api.deleteTraining(trainingId).subscribe({
      next: (res) => {
        this.snackbar.open(res, 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      },
      error: (err) => {
        this.snackbar.open('Server error...', 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
        console.log(err);

      },
      complete: () => {
        this.fetchTrainingData();
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

}
