import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { employeeData } from 'src/static-data/employees';
import { AddOnboardingModalComponent } from './add-onboarding-modal/add-onboarding-modal.component';
import { MatTableDataSource } from '@angular/material/table';

interface Task {
  title: string;
  assignedTo: string;
  attachmentUrl?: string;
  isFileRequired: boolean;
  taskDue: number;
}

@Component({
  selector: 'vex-onboarding-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.scss']
})
export class OnboardingFormComponent implements OnInit {
  employeeId!: string;
  employeeDetails!: any; // Define the type for employee details
  // Columns displayed in the table
  displayedColumns: string[] = ['title', 'assignedTo', 'attachmentRequired', 'taskDue', 'actions'];  

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id')!;
      // this.getEmployeeDetails(); // Fetch employee details using the ID
    });
  }

  openOnboardingTask() {
    const dialogRef = this.dialog.open(AddOnboardingModalComponent, {
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

  // Method to fetch employee details
  getEmployeeDetails(): void {
    const employeeIdNum = Number(this.employeeId); // Convert to number if ID is numeric
    this.employeeDetails = employeeData.find((employee: any) => employee.id === employeeIdNum)!;
    
    if (!this.employeeDetails) {
      console.error('Employee not found');
    }
  }

  // for table and tab
  // Data sources for the tables in each tab
  inProgressDataSource = new MatTableDataSource<Task>([
    {
      title: 'Task 1 - Design Homepage',
      assignedTo: 'Shawon Talukder',
      isFileRequired: true,
      taskDue: 30,
    },
    {
      title: 'Task 2 - Implement API Integration',
      assignedTo: 'Shawon Talukder',
      isFileRequired: false,
      taskDue: 15,
    },
    {
      title: 'Task 3 - Unit Testing',
      assignedTo: 'Shawon Talukder',
      isFileRequired: true,
      taskDue: 29,
    },
  ]);

  completedDataSource = new MatTableDataSource<Task>([
    {
      title: 'Task 4 - Set Up Dev Environment',
      assignedTo: 'Shawon Talukder',
      isFileRequired: false,
      attachmentUrl: 'https://example.com/file3.pdf',
      taskDue: 30,
    },
    {
      title: 'Task 5 - Write Documentation',
      assignedTo: 'Shawon Talukder',
      isFileRequired: false,
      taskDue: 15,
    },
  ]);

  markAsCompleted(task: Task) {
    if (task.isFileRequired && !task.attachmentUrl) {
      // Logic to handle file upload, e.g., open a file input dialog
      this.uploadFile(task);
    } else {
      this.completeTask(task);
    }
  }

  completeTask(task: Task) {
    // Move the task from in-progress to completed
    this.completedDataSource.data = [...this.completedDataSource.data, task];
    this.inProgressDataSource.data = this.inProgressDataSource.data.filter(
      (t) => t !== task
    );
  }  

  uploadFile(task: Task) {
    // Open a file input dialog to select a file for upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf, .doc, .docx, .png, .jpg'; // Allowed file types

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        // Here you would upload the file to your server or storage and get the URL
        // For now, we'll simulate setting a file URL after uploading
        const fakeUrl = `https://example.com/uploads/${file.name}`;
        task.attachmentUrl = fakeUrl;

        // Now mark the task as completed
        this.completeTask(task);
      }
    };

    fileInput.click(); // Open the file dialog
  }

  editTask(task: Task) {
    console.log('Edit task:', task);
  }

  deleteTask(task: Task) {
    if (this.inProgressDataSource.data.includes(task)) {
      this.inProgressDataSource.data = this.inProgressDataSource.data.filter(
        (t) => t !== task
      );
    } else if (this.completedDataSource.data.includes(task)) {
      this.completedDataSource.data = this.completedDataSource.data.filter(
        (t) => t !== task
      );
    }
  }  

}
