import { Component } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent {

  constructor(private contactsService: ContactsService) {}
  
    get contacts(): Contact[] {
      return this.contactsService.contacts;
    }
  
    trackByContactId(index, contact) {
      return contact.id;
    }
  }
