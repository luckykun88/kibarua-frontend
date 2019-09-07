import { Jobtype } from './../../../shared/models/jobtype.model';
import { JobtypeService } from './../../../shared/services/jobtype.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private db: AngularFireDatabase, private js: JobtypeService) {}

  // get list of job types
  jobs$: Observable<Jobtype[]>;

  // get list of workers
  workers: Observable<any[]>;

  // get list of brokers
  brokers: Observable<any[]>;

  // get list of clients
  clients: Observable<any[]>;

  clerks: Observable<any[]>;

  workersCount: any;
  clientsCount: any;
  clerksCount: any;
  brokersCount: any;

  doughnutChartLabels: Label[] = ['Clerks', 'Workers', 'Clients', 'Brokers'];
  doughnutChartData = [];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Array<any> = [
    {
      backgroundColor: ['red', 'yellow', 'green', 'blue']
    }
  ];

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

    this.clerks = this.db
      .list('users', ref => ref.orderByChild('role').equalTo('clerk'))
      .valueChanges();

    this.jobs$ = this.js.getJobTypes().valueChanges();

    this.clerks.subscribe(data => {
      this.clerksCount = data.length;
      console.log('test count' + this.clerksCount);
      this.doughnutChartData.push(this.clerksCount);
      console.log(this.doughnutChartData);
    });

    this.workers.subscribe(data => {
      this.workersCount = data.length;
      this.doughnutChartData.push(this.workersCount);
      console.log(this.doughnutChartData);
    });

    this.clients.subscribe(data => {
      this.clientsCount = data.length;
      this.doughnutChartData.push(this.clientsCount);
      console.log(this.doughnutChartData);
    });

    this.brokers.subscribe(data => {
      this.brokersCount = data.length;
      this.doughnutChartData.push(this.brokersCount);
      console.log(this.doughnutChartData);
    });
  }
}
