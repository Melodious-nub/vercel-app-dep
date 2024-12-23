import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { AddAssetModalComponent } from './add-asset-modal/add-asset-modal.component';
import { ReturnAssetModalComponent } from './return-asset-modal/return-asset-modal.component';

@Component({
  selector: 'vex-assets-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './assets-form.component.html',
  styleUrls: ['./assets-form.component.scss']
})
export class AssetsFormComponent {

  constructor(private dialog: MatDialog) {}

  openAssetsModal() {
    const dialogRef = this.dialog.open(AddAssetModalComponent, {
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

  returnAssetModal(asset: any) {
    const dialogRef = this.dialog.open(ReturnAssetModalComponent, {
      width: '600px',
      disableClose: true,
      data: { assetName: asset.name }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        console.log('Dialog result:', result);
      }
    });
  }

  // Dummy data structure
  ELEMENT_DATA: any[] = [
    { name: 'Laptop', category: 'Electronics', description: 'Dell Latitude 7420', assetNumber: 'A-1001', serialGiven: 'S-101' },
    { name: 'Projector', category: 'Office Equipment', description: 'Epson XGA', assetNumber: 'A-1002', serialGiven: 'S-102' },
    { name: 'Chair', category: 'Furniture', description: 'Ergonomic chair', assetNumber: 'A-1003', serialGiven: 'S-103' },
    { name: 'Desk', category: 'Furniture', description: 'Standing desk', assetNumber: 'A-1004', serialGiven: 'S-104' },
    { name: 'Phone', category: 'Electronics', description: 'iPhone 12', assetNumber: 'A-1005', serialGiven: 'S-105' },
    { name: 'Monitor', category: 'Office Equipment', description: '24-inch Dell Monitor', assetNumber: 'A-1006', serialGiven: 'S-106' }
  ];

  // Columns displayed in the table
  displayedColumns: string[] = ['name', 'category', 'description', 'assetNumber', 'serialGiven', 'actions'];
  dataSource = this.ELEMENT_DATA;

}
