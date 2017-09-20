import { EventBusService } from '../event-bus.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../state-management';
import { SelectContactAction, UpdateContactAction } from '../state-management/contacts/contacts.actions';
import { Observable } from 'rxjs/observable';
import { ContactsQuery } from '../state-management/contacts/contacts.reducer'

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService,
    private eventBusService: EventBusService,
    private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contact$ = this.store.select(ContactsQuery.getSelectedContact);
    this.contact$.take(1).subscribe(contact =>
      this.eventBusService.emit('appTitleChange', `Edit: ${contact.name}`));
  }

  cancel(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }

  save(contact: Contact) {
    this.store.dispatch(new UpdateContactAction(contact));
    this.contactsService.updateContact(contact).subscribe(() => this.cancel(contact));
  }
}
