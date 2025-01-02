import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Contact } from 'src/app/pages/apps/contacts/interfaces/contact.interface';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-employee-card',
  standalone: true,
  imports: [CommonModule, MatRippleModule, MatIconModule, MatButtonModule],
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  @Input({ required: true }) contact!: any;
  @Output() openContact = new EventEmitter<any['eid']>();
  @Output() toggleStar = new EventEmitter<any['eid']>();

  constructor(private router: Router) { }

  ngOnInit() { }

  // emitToggleStar(event: MouseEvent, contactId: Contact['id']) {
  //   event.stopPropagation();
  //   this.toggleStar.emit(contactId);
  // }
  viewEmployeeDetails(id: number) {
    this.router.navigate(['dashboard/company', this.contact.eid], {
      state: { data: this.contact }
    });
  }

}
