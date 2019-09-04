import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-clerk',
  templateUrl: './clerk.component.html',
  styleUrls: ['./clerk.component.css']
})
export class ClerkComponent implements OnInit {

  clerksRef: AngularFireList<any>;
  clerk$: Observable<User[]>

  constructor(private db: AngularFireDatabase) {
    this.clerksRef = this.db.list('users', ref => ref.orderByChild('role').equalTo('clerk'));
    // Use snapshotChanges().map() to store the key
    this.clerk$ = this.clerksRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   }

  ngOnInit() {
  }

}
