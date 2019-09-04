import { AngularFireList } from "@angular/fire/database";
import { JobtypeService } from "./../../../shared/services/jobtype.service";

import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { map } from "rxjs/operators";

@Component({
  selector: "app-jobtype",
  templateUrl: "./jobtype.component.html",
  styleUrls: ["./jobtype.component.css"]
})
export class JobtypeComponent implements OnInit {
  jobRef: AngularFireList<any>; //variable which is used to hold the array of job types

  job$: Observable<any>; //observable which is used to hold the observable array of job types         

  editKey: any; //this is a variable which is used to hold the edit key; used when attempting to update data

  constructor(
    private jobService: JobtypeService,
    private modalService: NgbModal // imports modal service from Angular Bootstrap
  ) {}

  //opens the angular bootstrap modal by passing the binded id for the modal which is #content
  openEditModal(content) {
    this.modalService.open(content);
  }

  //function used to close all modals
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

  //new job form data
  jobForm = new FormGroup({
    name: new FormControl("", Validators.required),
    small: new FormControl("", Validators.required),
    medium: new FormControl("", Validators.required),
    high: new FormControl("", Validators.required)
  });

  //form used for editing
  editJobForm = new FormGroup({
    name: new FormControl("", Validators.required),
    small: new FormControl("", Validators.required),
    medium: new FormControl("", Validators.required),
    high: new FormControl("", Validators.required)
  });

  //function for submitting the new job type to database
  onSubmit(frm) {
    this.jobService.addJobType(frm.value);
    this.jobForm.reset();
    document.getElementById("closeJobModal").click();
  }

  //function for getting data on edit form from database
  onEdit(data, content) {
    this.editKey = data.key;

    this.jobService.getSpecificJobType(this.editKey).subscribe(data => {
      console.log(data);
      this.editJobForm.setValue(data);
    });
    this.openEditModal(content);
  }

  updateJobData(data) {
    this.closeModal();
    this.jobService.updateJobType(data.value, this.editKey);
    this.editJobForm.reset();
  }
}
