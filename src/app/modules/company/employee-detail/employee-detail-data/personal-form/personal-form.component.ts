import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatDialog } from '@angular/material/dialog';
import { AddChildrenModalComponent } from './add-children-modal/add-children-modal.component';

export interface Children {
  childrenName: string;
  birthDate: Date;
}

@Component({
  selector: 'vex-personal-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent {

  constructor(public dialog: MatDialog) {}

  // for positions
  childrens: any = [
    { childrenName: 'Children 1', birthDate: new Date('2022-10-6') },
    { childrenName: 'Children 2', birthDate: new Date('2019-10-1') },
  ];

  openChildrenModal(): void {
    const dialogRef = this.dialog.open(AddChildrenModalComponent, {
      width: '400px',
      disableClose: true,
      data: { childrenName: '', startDate: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.childrens.push(result);
      }
    });
  }

}
