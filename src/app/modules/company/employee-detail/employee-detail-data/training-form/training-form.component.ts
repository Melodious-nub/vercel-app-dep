import { Component, OnInit, DestroyRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTrainingModalComponent } from './add-new-training-modal/add-new-training-modal.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

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
  employeeId: any;
  dataSource: any[] = []; // Ensure dataSource is an array
  @Input({ required: true }) selectedEmployeeName: string = '';
  @Input() isGlobalTraining: boolean = false;

  constructor(private dialog: MatDialog, private destroyRef: DestroyRef, private api: DataService, private snackbar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id')!;
      this.fetchTrainingData();
    });
  }

  fetchTrainingData(): void {
    const subscription = this.api.getAllTraining().pipe(
      map(res => {
        const data: any[] = res.content;
        // console.log(data);
        return this.isGlobalTraining ? data : data.filter(res => res.employeeIds?.some((id: any) => id === Number(this.employeeId)));
      })
    ).subscribe({
      next: (res) => this.dataSource = res,
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
      data: { employeeName: this.selectedEmployeeName, employeeId: this.employeeId, isGlobalTraining: this.isGlobalTraining }
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
    // console.log('Deleting row:', trainingId);
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
        // console.log(err);

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
