import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MdToolbarModule, MdListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContactsAppComponent } from './app.component';

@NgModule({
  declarations: [ContactsAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule, MdListModule,
    FlexLayoutModule
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}
