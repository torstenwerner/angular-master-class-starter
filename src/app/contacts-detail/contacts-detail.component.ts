import { Contact } from '../models/contact';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent {

  @Input() contact: Contact;
  @Output() back = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Contact>();
}
