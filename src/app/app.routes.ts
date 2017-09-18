import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';

export const APP_ROUTES = [
  { path: '', component: ContactsListComponent },
  { path: 'contacts/:id', component: ContactsDetailComponent },
  { path: '**', redirectTo: '' }
]
