import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  term$ = new Subject<string>();

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contacts$ = this.contactsService.getContacts();
    this.term$
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => this.contacts$ = this.contactsService.search(term));
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
