import { ContactExistsGuard } from './contact-exists.guard';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailViewComponent } from './contacts-detail-view/contacts-detail-view.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';

export const APP_ROUTES = [
  { path: '', component: ContactsListComponent },
  { path: 'contact/:id', component: ContactsDetailViewComponent, canActivate: [ContactExistsGuard] },
  { path: 'contact/:id/edit', component: ContactsEditorComponent, canActivate: [ContactExistsGuard] },
  { path: '**', redirectTo: '' }
]
