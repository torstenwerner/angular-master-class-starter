import { Component, AfterContentInit, QueryList, ContentChildren } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'trm-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent)
  tabComponents: QueryList<TabComponent>;

  constructor() { }

  ngAfterContentInit() {
    this.selectTab(this.tabComponents.first);
  }

  selectTab(tabComponent: TabComponent) {
    this.tabComponents.forEach(each => each.selected = false);
    tabComponent.selected = true;
  }
}
