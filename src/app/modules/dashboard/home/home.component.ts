import { Jobtype } from './../../../shared/models/jobtype.model';
import { JobtypeService } from './../../../shared/services/jobtype.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jobs$ : Observable<Jobtype[]>;
  
  // get list of workers
  workersRef: AngularFireList<any>;
  workers: Observable<any[]>;

  // get list of brokers
  brokersRef: AngularFireList<any>;
  brokers: Observable<any[]>;

  //get list of clients
  clientsRef: AngularFireList<any>;
  clients: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private js: JobtypeService) {
  }


  ngOnInit() {
    // code to pull workers from db
    this.workersRef = this.db.list('users', ref => ref.orderByChild('role').equalTo('worker')) ;
    this.workers = this.workersRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

     // code to pull clients from db
     this.clientsRef = this.db.list('users', ref => ref.orderByChild('role').equalTo('client')) ;
     this.clients = this.clientsRef.snapshotChanges().pipe(
       map(changes => 
         changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
       )
     );

      // code to pull brokers from db
    this.brokersRef = this.db.list('users', ref => ref.orderByChild('role').equalTo('broker')) ;
    this.brokers = this.brokersRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.jobs$ = this.js.getJobTypes();
  }

}
