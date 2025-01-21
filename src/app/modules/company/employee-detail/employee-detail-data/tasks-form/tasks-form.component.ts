import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatDialog } from '@angular/material/dialog';
import { AddTasksModalComponent } from './add-tasks-modal/add-tasks-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';

interface Task {
  title: string;
  assignedBy: string;
  attachmentUrl?: string;
  isFileRequired: boolean;
  deadline: Date;
}

@Component({
  selector: 'vex-tasks-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms, fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.scss']
})
export class TasksFormComponent implements OnInit {
  // Columns displayed in the table
  displayedColumns: string[] = ['title', 'createdby', 'attachment', 'deadline', 'actions'];

  constructor(private dialog: MatDialog, private api: DataService, private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  openTaskAddModal() {
    const dialogRef = this.dialog.open(AddTasksModalComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        // console.log('Dialog result:', result);
        this.fetchTasks();
      }
    });
  }

  // Data sources for the tables in each tab
  inProgressDataSource: any[] = [];

  completedDataSource: any[] = [];

  fetchTasks() {
    const subscription = this.api.getAllTasks().subscribe({
      next: (res) => {
        this.inProgressDataSource = res.content
      },
      error: err => console.log(err),
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  // markAsCompleted(task: Task) {
  //   if (task.isFileRequired && !task.attachmentUrl) {
  //     // Logic to handle file upload, e.g., open a file input dialog
  //     this.uploadFile(task);
  //   } else {
  //     this.completeTask(task);
  //   }
  // }

  // completeTask(task: Task) {
  //   // Move the task from in-progress to completed
  //   this.completedDataSource.data = [...this.completedDataSource.data, task];
  //   this.inProgressDataSource.data = this.inProgressDataSource.data.filter(
  //     (t) => t !== task
  //   );
  // }

  // uploadFile(task: Task) {
  //   // Open a file input dialog to select a file for upload
  //   const fileInput = document.createElement('input');
  //   fileInput.type = 'file';
  //   fileInput.accept = '.pdf, .doc, .docx, .png, .jpg'; // Allowed file types

  //   fileInput.onchange = (event: any) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       // Here you would upload the file to your server or storage and get the URL
  //       // For now, we'll simulate setting a file URL after uploading
  //       const fakeUrl = `https://example.com/uploads/${file.name}`;
  //       task.attachmentUrl = fakeUrl;

  //       // Now mark the task as completed
  //       this.completeTask(task);
  //     }
  //   };

  //   fileInput.click(); // Open the file dialog
  // }

  editTask(task: Task) {
    console.log('Edit task:', task);
  }

  deleteTask(task: Task) {
    // if (this.inProgressDataSource.data.includes(task)) {
    //   this.inProgressDataSource.data = this.inProgressDataSource.data.filter(
    //     (t) => t !== task
    //   );
    // } else if (this.completedDataSource.data.includes(task)) {
    //   this.completedDataSource.data = this.completedDataSource.data.filter(
    //     (t) => t !== task
    //   );
    // }
  }

}
