import { EventBusService } from './event-bus.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trm-contacts-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent implements OnInit {
  title = 'Contacts';

  constructor(private eventBusService: EventBusService) { }

  ngOnInit() {
    this.eventBusService
      .observe('appTitleChange')
      .subscribe(title => this.title = title);
  }
}
