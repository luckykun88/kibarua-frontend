import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.css']
})
export class BrokerComponent implements OnInit {

  brokersRef: AngularFireList<any>;
  broker$: Observable<User[]>;

  constructor(private db: AngularFireDatabase) {
    this.brokersRef = this.db.list('users', ref => ref.orderByChild('role').equalTo('broker'));
    // Use snapshotChanges().map() to store the key
    this.broker$ = this.brokersRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   }

  ngOnInit() {
  }

}
