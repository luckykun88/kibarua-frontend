import { AngularFireList } from '@angular/fire/database';
import { JobtypeService } from './../../../shared/services/jobtype.service';

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-jobtype',
  templateUrl: './jobtype.component.html',
  styleUrls: ['./jobtype.component.css']
})
export class JobtypeComponent implements OnInit {

  constructor(
    private jobService: JobtypeService,
    private modalService: NgbModal // imports modal service from Angular Bootstrap
  ) {}
  jobRef: AngularFireList<any>; // variable which is used to hold the array of job types

  job$: Observable<any>; // observable which is used to hold the observable array of job types

  editKey: any; // this is a variable which is used to hold the edit key; used when attempting to update data

  deleteKey: any;

  deleteJobData: any;

  // form used for creating new job type
  jobForm = new FormGroup({
    name: new FormControl('', Validators.required),
    small: new FormControl('', Validators.required),
    medium: new FormControl('', Validators.required),
    high: new FormControl('', Validators.required)
  });

  // form used for editing job type
  editJobForm = new FormGroup({
    name: new FormControl('', Validators.required),
    small: new FormControl('', Validators.required),
    medium: new FormControl('', Validators.required),
    high: new FormControl('', Validators.required)
  });

  // opens the angular bootstrap modal by passing the binded id for the modal which is #content
  openEditModal(content) {
    this.modalService.open(content);
  }

  openDeleteModal(remove) {
    this.modalService.open(remove);
  }

  // function used to close all modals
  closeModal() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    this.jobRef = this.jobService.getJobTypes();

    this.job$ = this.jobRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }))
      )
    );
  }

  // function for submitting the new job type to database
  onSubmit(frm) {
    this.jobService.addJobType(frm.value);
    this.jobForm.reset();
    document.getElementById('closeJobModal').click();
  }

  // function for getting data on edit form from database
  onEdit(data, content) {
    this.editKey = data.key;

    // tslint:disable-next-line: no-shadowed-variable
    this.jobService.getSpecificJobType(this.editKey).subscribe(data => {
      console.log(data);
      this.editJobForm.setValue(data);
    });
    this.openEditModal(content);
  }

  // function to update job type data
  updateJobData(data) {
    this.closeModal();
    this.jobService.updateJobType(data.value, this.editKey);
    this.editJobForm.reset();
  }

  onDelete(data, remove) {
    this.deleteKey = data.key;
    // tslint:disable-next-line: no-shadowed-variable
    this.jobService.getSpecificJobType(this.deleteKey).subscribe(x => {
      console.log(x);
      this.deleteJobData = x;
    });
    this.openDeleteModal(remove);
  }

  deleteAction() {
    this.closeModal();
    this.jobService.deleteJobType(this.deleteKey);
  }


}
