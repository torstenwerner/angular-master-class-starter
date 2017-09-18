import { ContactsService } from './contacts.service';
import { Component } from '@angular/core';
import { Contact } from './models/contact';

@Component({
  selector: 'trm-contacts-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent {

  constructor(private contactsService: ContactsService) {}

  get contacts(): Contact[] {
    return this.contactsService.contacts;
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
