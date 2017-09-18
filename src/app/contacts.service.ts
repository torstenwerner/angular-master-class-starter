import { Injectable } from '@angular/core';
import { CONTACT_DATA } from './data/contact-data';

@Injectable()
export class ContactsService {

  get contacts() {
    return CONTACT_DATA;
  }

  getContact(id) {
    return CONTACT_DATA.find(contact => contact.id == id);
  }
}
