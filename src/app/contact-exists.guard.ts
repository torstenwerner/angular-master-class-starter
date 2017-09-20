import { Injectable } from '@angular/core';
import { ContactsService } from './contacts.service';
import { AddContactAction, SelectContactAction } from './state-management/contacts/contacts.actions';
import { ApplicationState } from './state-management';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import { ContactsQuery } from './state-management/contacts/contacts.reducer'

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(private store: Store<ApplicationState>, private contactsService: ContactsService) {}

  canActivate(route: ActivatedRouteSnapshot) {

    const contactId = route.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+contactId));

    return this.store.select(ContactsQuery.isLoaded)
      .take(1)
      .switchMap(loaded => {
        if (loaded) return Observable.of(true);

        return this.contactsService.getContact(contactId)
          .do(contact => this.store.dispatch(new AddContactAction(contact)))
          .map(contact => !!contact);
      });
  }
}
