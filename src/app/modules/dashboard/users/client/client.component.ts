import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientsRef: AngularFireList<any>;
  client$: Observable<User[]>

  constructor(private db: AngularFireDatabase) {
    this.clientsRef = this.db.list('users', ref => ref.orderByChild('role').equalTo('client'));
    // Use snapshotChanges().map() to store the key
    this.client$ = this.clientsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   }

  ngOnInit() {
  }

}
 