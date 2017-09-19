import { Component, OnInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Component({
  selector: 'trm-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  tabComponents: TabComponent[] = [];

  constructor() { }

  ngOnInit() {
  }

  addTab(tabComponent: TabComponent) {
    if (this.tabComponents.length == 0) {
      tabComponent.selected = true;
    }
    this.tabComponents.push(tabComponent)
  }

  selectTab(tabComponent: TabComponent) {
    Observable.from(this.tabComponents)
      .subscribe(each => each.selected = false);
    tabComponent.selected = true;
  }
}
