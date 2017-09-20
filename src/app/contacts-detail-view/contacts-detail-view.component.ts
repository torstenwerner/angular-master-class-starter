import { SelectContactAction } from '../state-management/contacts/contacts.actions';
import { ApplicationState } from '../state-management';
import { Contact } from '../models/contact';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { EventBusService } from '../event-bus.service';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'trm-contacts-detail-view',
  template: '<trm-contacts-detail [contact]="contact$ | async" (back)="back()" (edit)="edit($event)"></trm-contacts-detail>',
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {

  contact$: Observable<Contact>

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService,
    private eventBusService: EventBusService,
    private store: Store<ApplicationState>) { }

  ngOnInit() {
    const query = state => {
      const id = state.contacts.selectedContactId;
      const contact = state.contacts.list.find(contact => contact.id == id);
      this.eventBusService.emit('appTitleChange', `Details: ${contact.name}`);
      return {...contact};
    }
    this.contact$ = this.store.select(query);
  }

  back() {
    this.router.navigate(['']);
  }

  edit(contact: Contact) {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
