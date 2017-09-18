import { Contact, newContact } from '../models/contact';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  contact: Contact = newContact();

  constructor(private route: ActivatedRoute,
    private contactsService: ContactsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.contactsService.getContact(id).subscribe(contact => this.contact = contact);
  }
}
