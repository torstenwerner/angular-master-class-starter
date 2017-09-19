import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface EventBusArgs {
  eventType: string,
  data: any
}

@Injectable()
export class EventBusService {

  private messages$ = new Subject<EventBusArgs>();

  emit(eventType: string, data: any) {
    this.messages$.next({ eventType, data });
  }

  observe(eventType: string): Observable<any> {
    return this.messages$
      .filter(message => message.eventType == eventType)
      .map(message => message.data);
  }
}
