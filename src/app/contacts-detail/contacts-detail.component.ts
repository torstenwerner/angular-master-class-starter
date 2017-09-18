import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private contactsService: ContactsService) { }

  ngOnInit() {
  }

  get contact() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.contactsService.getContact(id));
    return this.contactsService.getContact(id);
  }

}
