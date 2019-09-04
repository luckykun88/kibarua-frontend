import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  workersRef: AngularFireList<any>;
  worker$: Observable<User[]>

  constructor(private db: AngularFireDatabase) {
    this.workersRef = this.db.list('users', ref => ref.orderByChild('role').equalTo('worker'));
    // Use snapshotChanges().map() to store the key
    this.worker$ = this.workersRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   }

  ngOnInit() {
    
  }

}
