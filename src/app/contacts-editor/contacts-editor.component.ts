import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../state-management';
import { SelectContactAction, UpdateContactAction } from '../state-management/contacts/contacts.actions';
import { Observable } from 'rxjs/observable';

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
    private store: Store<ApplicationState>) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+id));

    const query = state => {
      const id = state.contacts.selectedContactId;
      const contact = state.contacts.list.find(contact => contact.id == id);
      return {...contact};
    }
    this.contact$ = this.store.select(query);
  }

  cancel(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }

  save(contact: Contact) {
    this.store.dispatch(new UpdateContactAction(contact));
    this.contactsService.updateContact(contact).subscribe(() => this.cancel(contact));
  }
}
