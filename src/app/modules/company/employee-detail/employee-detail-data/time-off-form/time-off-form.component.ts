import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { ApexOptions, VexChartComponent } from '@vex/components/vex-chart/vex-chart.component';
import { MatDialog } from '@angular/material/dialog';
import { AddLongTermLeaveModalComponent } from './add-long-term-leave-modal/add-long-term-leave-modal.component';
import { AddRequestTimeOffModalComponent } from './add-request-time-off-modal/add-request-time-off-modal.component';
import { ActivatedRoute } from '@angular/router';
import { employeeData } from 'src/static-data/employees';

@Component({
  selector: 'vex-time-off-form',
  standalone: true,
  animations: [stagger60ms, fadeInUp400ms,fadeInRight400ms],
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
    VexChartComponent
  ],
  templateUrl: './time-off-form.component.html',
  styleUrls: ['./time-off-form.component.scss']
})
export class TimeOffFormComponent {
  employeeId!: string;
  employeeDetails!: any; // Define the type for employee details

  // for chats dognut
  holidayOptions: ApexOptions = {};
  sickdayOptions: ApexOptions = {};
  businessTripOptions: ApexOptions = {};

  holidaySeries: number[] = [];
  sickdaySeries: number[] = [];
  businessTripSeries: number[] = [];

  holidayUsed = 5; // Example used days for Holiday
  holidayTotal = 20;

  sickdayUsed = 2; // Example used days for Sickday
  sickdayTotal = 10;

  businessTripUsed = 1; // Example used days for Business Trip
  businessTripTotal = 5;

  constructor(private dialog: MatDialog, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id')!;
      this.getEmployeeDetails(); // Fetch employee details using the ID
    });

    // for dognut chart init
    // Set up series as percentages of total days
    this.holidaySeries = [(this.holidayUsed / this.holidayTotal) * 100];
    this.sickdaySeries = [(this.sickdayUsed / this.sickdayTotal) * 100];
    this.businessTripSeries = [(this.businessTripUsed / this.businessTripTotal) * 100];

    // Create chart options with percentage and size settings
    this.holidayOptions = this.createChartOptions('Holiday', this.holidayUsed, this.holidayTotal, '#34a853');
    this.sickdayOptions = this.createChartOptions('Sickday', this.sickdayUsed, this.sickdayTotal, '#ff7043');
    this.businessTripOptions = this.createChartOptions('Business Trip', this.businessTripUsed, this.businessTripTotal, '#42a5f5');
  }

  calculatePercentage(used: number, total: number): number {
    return (used / total) * 100;
  }

  createChartOptions(label: string, used: number, total: number, color: string): ApexOptions {
    const usedPercentage = (used / total) * 100; // Calculate the percentage used
    return {
      chart: {
        type: 'donut',
        height: 250,
      },
      series: [100],  // Fill the donut to 100%
      plotOptions: {
        pie: {
          donut: {
            size: '75%',  // Adjusts donut size
            labels: {
              show: true,
              total: {
                show: true,
                label: `${label}`,  // Label under the donut
                fontSize: '16px',
                color: '#333',
                formatter: () => `${used} of ${total} days`,  // Shows used/total days
              },
            },
          },
        },
      },
      tooltip: {
        enabled: true,
        shared: false,
        y: {
          formatter: () => `${label} used: ${usedPercentage.toFixed(0)}%` // Tooltip shows percentage used without "series-1"
        }
      },
      dataLabels: {
        enabled: false,  // Hides default data label inside donut
      },
      colors: [color],
      legend: {
        show: false,
      },
    };
  }

  // Method to fetch employee details
  getEmployeeDetails(): void {
    const employeeIdNum = Number(this.employeeId); // Convert to number if ID is numeric
    this.employeeDetails = employeeData.find((employee: any) => employee.id === employeeIdNum)!;
    // console.log(this.employeeDetails);
    
    if (!this.employeeDetails) {
      console.error('Employee not found');
    }
  }

  openLongTermLeaveModal() {
    const dialogRef = this.dialog.open(AddLongTermLeaveModalComponent, {
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

  openRequestTimeOffModal() {
    const dialogRef = this.dialog.open(AddRequestTimeOffModalComponent, {
      width: '600px',
      disableClose: true,
      data: { employeeDetails: this.employeeDetails.name } // Pass data to modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if necessary
        // console.log('Dialog result:', result);
      }
    });
  }

  // for table time off
  // Column definitions
  displayedColumnsTimeOff: string[] = ['policy', 'allowancePeriod', 'balance', 'inCurrentPeriod', 'carriedOver'];

  // Data source with new structure
  dataSourceTimeOff = [
    {
      policy: 'Sickday',
      allowancePeriod: '01/01/2024 - 31/12/2024',
      balance: '20 days remaining',
      inCurrentPeriod: '0 days used',
      carriedOver: '20 days'
    },
    {
      policy: 'Holiday',
      allowancePeriod: '01/01/2024 - 31/12/2024',
      balance: '15 days remaining',
      inCurrentPeriod: '5 days used',
      carriedOver: '0 days'
    },
    {
      policy: 'Business Trip',
      allowancePeriod: '01/01/2024 - 31/12/2024',
      balance: '5 days remaining',
      inCurrentPeriod: '1 day used',
      carriedOver: '0 days'
    }
  ];

  // for table time off details
// Define displayed columns
displayedColumnsTimeOffHistory: string[] = [
  'dates',
  'dateRequested',
  'policy',
  'details',
  'status',
  'actions'
];

// Sample data source with expanded structure for showcasing
dataSourceTimeOffHistory = [
  {
    dates: '30/11/2024',
    timeStatus: 'All day',
    dateRequested: '25/11/2024',
    policy: 'Sickday',
    details: 'Requested due to illness',
    status: 'Awaiting Approval'
  },
  {
    dates: '31/10/2024 - 04/11/2024',
    timeStatus: '3 days',
    dateRequested: '27/10/2024',
    policy: 'Holiday',
    details: 'Annual vacation',
    status: 'Approved'
  },
  {
    dates: '15/09/2024',
    timeStatus: '2 hours',
    dateRequested: '13/09/2024',
    policy: 'Business Trip',
    details: 'Meeting with client in another city',
    status: 'Cancelled'
  },
  {
    dates: '10/08/2024',
    timeStatus: 'Half day',
    dateRequested: '05/08/2024',
    policy: 'Sickday',
    details: 'Medical check-up',
    status: 'Approved'
  },
  {
    dates: '01/07/2024 - 05/07/2024',
    timeStatus: '5 days',
    dateRequested: '25/06/2024',
    policy: 'Holiday',
    details: 'Family holiday trip',
    status: 'Awaiting Approval'
  }
];

// Mock functions for actions
acceptRequest(element: any) {
  console.log('Accepted request for', element);
}

declineRequest(element: any) {
  console.log('Declined request for', element);
}

}
