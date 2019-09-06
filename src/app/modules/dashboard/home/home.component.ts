import { Jobtype } from './../../../shared/models/jobtype.model';
import { JobtypeService } from './../../../shared/services/jobtype.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // get list of job types
  jobs$: Observable<Jobtype[]>;

  // get list of workers
  workers: Observable<any[]>;

  // get list of brokers
  brokers: Observable<any[]>;

  // get list of clients
  clients: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private js: JobtypeService) {}

  ngOnInit() {
    // code to pull workers from db
    this.workers = this.db
      .list('users', ref => ref.orderByChild('role').equalTo('worker'))
      .valueChanges();

    // code to pull clients from db
    this.clients = this.db
      .list('users', ref => ref.orderByChild('role').equalTo('client'))
      .valueChanges();

    // code to pull brokers from db
    this.brokers = this.db
      .list('users', ref => ref.orderByChild('role').equalTo('broker'))
      .valueChanges();

    this.jobs$ = this.js.getJobTypes().valueChanges();
  }
}
