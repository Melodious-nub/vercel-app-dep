import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { Contact } from 'src/app/pages/apps/contacts/interfaces/contact.interface';
import { contactsData } from 'src/static-data/contacts';
export interface EmployeeMenu {
  type: 'link' | 'subheading';
  id?:
    | 'employee'
    | 'personal'
    | 'notes'
    | 'documents'
    | 'assets'
    | 'training'
    | 'emergencyContacts'
    | 'tasks'
    | 'onboarding'
    | 'reports'
    | 'timeOff'
    | 'compensation'
  icon?: string;
  label: string;
  classes?: {
    icon?: string;
  };
}

@Component({
  selector: 'vex-employee-detail-menu',
  standalone: true,
  animations: [fadeInRight400ms, stagger40ms],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    NgFor,
    NgIf,
    MatRippleModule,
    NgClass
  ],
  templateUrl: './employee-detail-menu.component.html',
  styleUrls: ['./employee-detail-menu.component.scss']
})
export class EmployeeDetailMenuComponent implements OnInit {
  @Input() items: EmployeeMenu[] = [
    {
      type: 'link',
      id: 'employee',
      icon: 'mat:business_center',
      label: 'Employee',
      // classes: {
      //   icon: 'text-primary-600'
      // }      
    },
    {
      type: 'link',
      id: 'personal',
      icon: 'mat:remove_red_eye',
      label: 'Personal',
      // classes: {
      //   icon: 'text-primary-600'
      // }      
    },
    {
      type: 'link',
      id: 'notes',
      icon: 'mat:note',
      label: 'Notes',
      // classes: {
      //   icon: 'text-primary-600'
      // }      
    },
    {
      type: 'link',
      id: 'documents',
      icon: 'mat:folder_open',
      label: 'Documents',
      // classes: {
      //   icon: 'text-primary-600'
      // }
    },
    {
      type: 'link',
      id: 'assets',
      icon: 'mat:label',
      label: 'Assets',
      // classes: {
      //   icon: 'text-primary-600'
      // }
    },
    {
      type: 'link',
      id: 'training',
      icon: 'mat:school',
      label: 'Training',
      // classes: {
      //   icon: 'text-primary-600'
      // }
    },
    {
      type: 'link',
      id: 'emergencyContacts',
      icon: 'mat:contact_phone',
      label: 'Emergency contacts',
      // classes: {
      //   icon: 'text-primary-600'
      // }
    },
    {
      type: 'link',
      id: 'tasks',
      icon: 'mat:list_alt',
      label: 'Tasks',
      // classes: {
      //   icon: 'text-primary-600'
      // }
    },
    {
      type: 'link',
      id: 'onboarding',
      icon: 'mat:add_circle',
      label: 'Onboarding',
      // classes: {
      //   icon: 'text-primary-600'
      // }
    },
    {
      type: 'link',
      id: 'reports',
      icon: 'mat:pie_chart',
      label: 'Reports',
      // classes: {
      //   icon: 'text-primary-600'
      // }
    },
    {
      type: 'link',
      id: 'timeOff',
      icon: 'mat:access_time',
      label: 'Time off',
      // classes: {
      //   icon: 'text-primary-600'
      // }
    },
    {
      type: 'link',
      id: 'compensation',
      icon: 'mat:monetization_on',
      label: 'Compensation',
      // classes: {
      //   icon: 'text-primary-600'
      // }
    },
  ];

  @Output() filterChange = new EventEmitter<EmployeeMenu['id']>();
  // @Output() openAddNew = new EventEmitter<void>();

  activeCategory: EmployeeMenu['id'] = 'employee';

  constructor() {}

  ngOnInit() {
    this.filterChange.emit(this.activeCategory);
  }

  setFilter(category: EmployeeMenu['id']) {
    this.activeCategory = category;
    this.filterChange.emit(this.activeCategory);
  }

  isActive(category: EmployeeMenu['id']) {
    return this.activeCategory === category;
  }

}
