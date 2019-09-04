import { Jobtype } from "./../../../shared/models/jobtype.model";
import { JobtypeService } from "./../../../shared/services/jobtype.service";

import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-jobtype",
  templateUrl: "./jobtype.component.html",
  styleUrls: ["./jobtype.component.css"]
})
export class JobtypeComponent implements OnInit {

  job$: Observable<Jobtype[]>; 

  constructor(
    private jobService: JobtypeService,
    private modalService: NgbModal        // imports modal service from Angular Bootstrap
  ) {}

  //opens the angular bootstrap modal by passing the binded id for the modal which is #edit
  open(edit) {
    this.modalService.open(edit, { ariaLabelledBy: "modal-basic-title" });
  }

  ngOnInit() {
    this.job$ = this.jobService.getJobTypes();  //on initialization pulls all the jobtypes from firebase
  }

  //new job form data
  jobForm = new FormGroup({
    name: new FormControl("", Validators.required),
    small: new FormControl("", Validators.required),
    medium: new FormControl("", Validators.required),
    high: new FormControl("", Validators.required)
  });

  //function for submitting the new job type to database
  onSubmit(frm) {
    console.log("adding job type...");
    console.log(frm.value);
    this.jobService.addJobType(frm.value);
    console.log("job type added");
    this.jobForm.reset();
    document.getElementById("closeJobModal").click();
    console.log("closed modal");
  }
}
