import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/takeUntil';

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
    const getInitial$ = this.contactsService.getContacts()
      //.delay(5000)
      .takeUntil(this.term$);
    const search$ = this.term$
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.contactsService.search(term));
    this.contacts$ = getInitial$.merge(search$);
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
