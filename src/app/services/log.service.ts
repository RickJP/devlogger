import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>
  (true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {id: '1', text: 'Generated components', date: new Date('10/26/2017 18:32:09')},
    //   {id: '2', text: 'Added bootstrap', date: new Date('10/28/2017 13:12:09')},
    //   {id: '3', text: 'Added logs component', date: new Date('10/29/2017 18:32:09')}
    // ];
    this.logs = [];
   }

   getLogs(): Observable<Log[]> {
     return of(this.logs);
   }

   setFormLog(log: Log) {
     this.logSource.next(log);
   }


    addLog(log: Log) {
      this.logs.unshift(log);
    }

    updateLog(log: Log) {
      this.logs.forEach((cur, index) => {
        if (log.id === cur.id) {
          this.logs.splice(index, 1);
        }
      });
      this.logs.unshift(log);
    }

    deleteLog(log: Log) {
      this.logs.forEach((cur, index) => {
        if (log.id === cur.id) {
          this.logs.splice(index, 1);
        }
      });
    }

    clearState() {
      this.stateSource.next(true);
    }
}
