import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { AddAssetModalComponent } from './add-asset-modal/add-asset-modal.component';
import { ReturnAssetModalComponent } from './return-asset-modal/return-asset-modal.component';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-assets-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './assets-form.component.html',
  styleUrls: ['./assets-form.component.scss']
})
export class AssetsFormComponent implements OnInit {
  employeeId: any;

  constructor(private dialog: MatDialog, private api: DataService, private route: ActivatedRoute, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id')!;
      this.fetchAllAllocatedAsset(); // Fetch employee details using the ID
    });
  }

  openAssetsModal() {
    const dialogRef = this.dialog.open(AddAssetModalComponent, {
      width: '600px',
      disableClose: true,
      data: { employeeId: this.employeeId } // Pass the data here
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        // console.log('Dialog result');
        this.fetchAllAllocatedAsset();
      }
    });
  }

  returnAssetModal(asset: any) {
    const dialogRef = this.dialog.open(ReturnAssetModalComponent, {
      width: '600px',
      disableClose: true,
      data: { assetName: asset.name, assetId: asset.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        // console.log('Dialog result:', result);
        this.fetchAllAllocatedAsset();
      }
    });
  }

  // Dummy data structure
  ELEMENT_DATA: any[] = [];

  fetchAllAllocatedAsset() {
    this.api.getAllocatedAssedOfEmp(this.employeeId).subscribe({
      next: (res) => {
        this.ELEMENT_DATA = res;
        console.log(res);
      },
      error: () => {
        this.snackbar.open('Server error. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  // Columns displayed in the table
  displayedColumns: string[] = ['name', 'category', 'description', 'assetNumber', 'status', 'actions'];
  // dataSource = this.ELEMENT_DATA;

}
