import { Component, Inject } from '@angular/core';
import { APP_STORE, ApplicationState } from '../store/root-reducer';
import { Store } from 'redux';

@Component({
  selector: 'trm-status',
  template: `
    {{ state.counter }}
    <div class="tip">All Votes!</div>
  `,
  styles: [
    `:host {  text-align:center; font-size:1.1em; font-weight: bolder  }`,
    `.tip { font-size:0.7em; padding-top:5px;font-weight: normal;  }`
  ]
})
export class StatusComponent {

  state;

  /**
   * Inject the appStore here and listen
   * for vote changes!
   */
  constructor( @Inject(APP_STORE) private store: Store<ApplicationState>) {
    this.state = store.getState().votes;

    store.subscribe(() => {
      this.state = store.getState().votes;
    })
  }
}

