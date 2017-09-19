import { Contact } from '../models/contact';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { EventBusService } from '../event-bus.service';

@Component({
  selector: 'trm-contacts-detail-view',
  template: '<trm-contacts-detail [contact]="contact" (back)="back()" (edit)="edit($event)"></trm-contacts-detail>',
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {

  contact: Contact = {
    id: -1,
    image: '',
    address: {}
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService,
    private eventBusService: EventBusService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.contactsService.getContact(id).subscribe(contact => {
      this.contact = contact;
      this.eventBusService.emit('appTitleChange', `Details: ${contact.name}`);
    });
  }

  back() {
    this.router.navigate(['']);
  }

  edit(contact: Contact) {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
