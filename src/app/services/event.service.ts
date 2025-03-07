import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
 private eventData = new Subject<any>();
  constructor() { }

  	publishEventsData(data: any) {
	    this.eventData.next(data);
	}

	getEventsData(): Observable<any> {
	    return this.eventData.asObservable();
	}
}
