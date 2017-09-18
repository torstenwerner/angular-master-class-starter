import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CONTACT_DATA } from './data/contact-data';
import { Contact } from './models/contact';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

interface ContactResponse { item: Contact }
interface ContactsResponse { items: Contact[] }

@Injectable()
export class ContactsService {

  API_ENDPOINT = 'http://localhost:4201';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Array<Contact>> {
    return this.http.get<ContactsResponse>(`${this.API_ENDPOINT}/api/contacts`).map(data => data.items);
  }

  getContact(id): Observable<Contact> {
    return this.http.get<ContactResponse>(`${this.API_ENDPOINT}/api/contacts/${id}`).map(data => data.item);
  }
}
