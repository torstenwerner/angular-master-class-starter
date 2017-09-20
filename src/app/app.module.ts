import { ContactExistsGuard } from './contact-exists.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ContactsAppComponent } from './app.component';
import { ContactsService } from './contacts.service';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { APP_ROUTES } from './app.routes';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import { ContactsDetailViewComponent } from './contacts-detail-view/contacts-detail-view.component';
import { TabComponent } from './tabs/tab/tab.component';
import { TabsComponent } from './tabs/tabs/tabs.component';
import { EventBusService } from './event-bus.service';

import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCER } from './state-management/';

@NgModule({
  declarations: [ContactsAppComponent, ContactsListComponent, ContactsDetailComponent, ContactsEditorComponent,
    ContactsDetailViewComponent, TabComponent, TabsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(ROOT_REDUCER)
  ],
  bootstrap: [ContactsAppComponent],
  providers: [
    ContactsService,
    EventBusService,
    ContactExistsGuard
  ]
})
export class ContactsModule {

}
