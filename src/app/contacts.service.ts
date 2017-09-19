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

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<ContactResponse>(`${this.API_ENDPOINT}/api/contacts/${contact.id}`, contact).map(data => data.item);
  }

  reactiveSearch(term$: Observable<string>, debounceMs = 400): Observable<Array<Contact>> {
    return term$.debounceTime(debounceMs)
      .distinctUntilChanged()
      .switchMap(term => this.search(term));
  }

  search(term: string): Observable<Array<Contact>> {
    return this.http.get<ContactsResponse>(`${this.API_ENDPOINT}/api/search?text=${term}`).map(data => data.items);
  }
}
