import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkerService } from './worker.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private modal: NgbModal, private service: WorkerService) {
    this.workersRef = this.db.list('users', ref => ref.orderByChild('role').equalTo('worker'));
    // Use snapshotChanges().map() to store the key
    this.worker$ = this.workersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() } ))
      )
    );
   }

  workersRef: AngularFireList<any>;
  worker$: Observable<any>;

  editKey: any;

  deleteKey: any;

   editWorkerForm = new FormGroup({
     fullName: new FormControl('', Validators.required),
     role: new FormControl('', Validators.required)
   });

   editWorkerModal(edit) {
     this.modal.open(edit);
   }

   editWorker(data, edit) {
    this.editKey = data.key;
    // tslint:disable-next-line: no-shadowed-variable
    this.service.getSpecificUser(this.editKey).subscribe(data => {
      console.log(data);
      this.editWorkerForm.patchValue(data);
    });
    this.editWorkerModal(edit);
   }

   updateWorker(frm) {
    this.service.updateWorker(frm.value, this.editKey);
    this.modal.dismissAll();
   }

  ngOnInit() {
  }

}
