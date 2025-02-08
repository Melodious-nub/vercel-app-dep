import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingFormComponent } from "../company/employee-detail/employee-detail-data/training-form/training-form.component";
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';

@Component({
  selector: 'vex-training',
  standalone: true,
  imports: [
    CommonModule,
    TrainingFormComponent,
    MATERIAL_IMPORTS,
    MatSnackBarModule
  ],
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  isGlobalTraining: boolean = true;
  selectedEmployeeName: string = '';
}
