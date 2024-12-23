import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
// import { ApexOptions } from './vex-chart.component';
import { ApexOptions, VexChartComponent } from "../../../../../../@vex/components/vex-chart/vex-chart.component"; 

@Component({
  selector: 'vex-reports-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
    VexChartComponent
  ],
  templateUrl: './reports-form.component.html',
  styleUrls: ['./reports-form.component.scss']
})
export class ReportsFormComponent {
  options: ApexOptions = {};
  series: ApexAxisChartSeries = [];

  ngOnInit(): void {
    this.series = [
      {
        name: 'Sickday',
        data: [2, 3, 4, 1, 3, 5, 2, 4, 6, 3, 5, 7]  // Mock data for Sickday
      },
      {
        name: 'Holiday',
        data: [1, 2, 2, 1, 2, 3, 1, 2, 3, 2, 3, 4]  // Mock data for Holiday
      },
      {
        name: 'Business Trip',
        data: [3, 4, 5, 2, 4, 6, 3, 5, 7, 4, 6, 8]  // Mock data for Business Trip
      }
    ];

    this.options = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'Last 12 Months Report',
        align: 'center'
      },
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      },
      yaxis: {
        title: {
          text: 'Days'
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " days";
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          // endingShape: 'rounded'
        }
      },
      fill: {
        opacity: 1
      },
      colors: ['#FF4560', '#00E396', '#008FFB']  // Customize the colors if needed
    };
  }

  // table for holidays
  displayedColumnsHoliday: string[] = ['created', 'createdBy', 'timeOffRequest', 'note', 'action', 'days'];
  displayedColumnsSickday: string[] = ['created', 'createdBy', 'timeOffRequest', 'note', 'action', 'days'];
  displayedColumnsBusinessTrip: string[] = ['created', 'createdBy', 'timeOffRequest', 'note', 'action', 'days'];
  
  dataSourceHoliday = [
    { created: '2023-01-01', createdBy: 'John Doe', timeOffRequest: 'Holiday', note: 'Annual holiday', action: 'Approved', days: 5 },
    { created: '2023-01-15', createdBy: 'Jane Smith', timeOffRequest: 'Sick Leave', note: 'Flu symptoms', action: 'Pending', days: 2 },
    { created: '2023-02-12', createdBy: 'Alex Brown', timeOffRequest: 'Business Trip', note: 'Conference attendance', action: 'Approved', days: 3 },
    { created: '2023-03-18', createdBy: 'David White', timeOffRequest: 'Holiday', note: 'Family vacation', action: 'Declined', days: 7 },
    { created: '2023-04-22', createdBy: 'Sarah Lee', timeOffRequest: 'Holiday', note: 'Personal retreat', action: 'Approved', days: 4 },
    { created: '2023-05-30', createdBy: 'John Doe', timeOffRequest: 'Business Trip', note: 'Client visit', action: 'Pending', days: 1 },
  ];

  dataSourceSickday = [
    { created: '2023-01-03', createdBy: 'Mike Johnson', timeOffRequest: 'Sickday', note: 'Flu', action: 'Approved', days: 3 },
    { created: '2023-04-10', createdBy: 'Anna Lee', timeOffRequest: 'Sickday', note: 'Migraine', action: 'Approved', days: 2 }
  ];
  
  dataSourceBusinessTrip = [
    { created: '2023-01-10', createdBy: 'Paul Martin', timeOffRequest: 'Business Trip', note: 'Conference', action: 'Completed', days: 4 },
    { created: '2023-03-22', createdBy: 'Laura Brown', timeOffRequest: 'Business Trip', note: 'Client meeting', action: 'Completed', days: 2 }
  ];  

}
