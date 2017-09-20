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
import { EventBusService } from '../event-bus.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../state-management';
import { LoadContactsSuccessAction } from '../state-management/contacts/contacts.actions';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  term$ = new Subject<string>();

  constructor(private contactsService: ContactsService,
    private eventBusService: EventBusService,
    private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.eventBusService.emit('appTitleChange', 'Contacts');

    let query = (state) => state.contacts.list;
    const getInitial$ = this.store.select(query)
      //.delay(5000)
      .takeUntil(this.term$);

    const search$ = this.contactsService.reactiveSearch(this.term$);
    this.contacts$ = getInitial$.merge(search$);

    this.contactsService
      .getContacts()
      .subscribe(contacts => {
        this.store.dispatch(
          new LoadContactsSuccessAction(contacts)
        );
      });
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
