import { SelectContactAction } from '../state-management/contacts/contacts.actions';
import { ApplicationState } from '../state-management';
import { Contact } from '../models/contact';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { EventBusService } from '../event-bus.service';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { ContactsQuery } from '../state-management/contacts/contacts.reducer'

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
    this.contact$ = this.store.select(ContactsQuery.getSelectedContact)
      .do(contact => this.eventBusService.emit('appTitleChange', `Details: ${contact.name}`));
  }

  back() {
    this.router.navigate(['']);
  }

  edit(contact: Contact) {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
