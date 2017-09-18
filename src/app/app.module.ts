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

@NgModule({
  declarations: [ContactsAppComponent, ContactsListComponent, ContactsDetailComponent, ContactsEditorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [ContactsAppComponent],
  providers: [
    ContactsService
  ]
})
export class ContactsModule {

}
