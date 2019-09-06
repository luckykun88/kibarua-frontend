import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { WorkerComponent } from './users/worker/worker.component';
import { ClientComponent } from './users/client/client.component';
import { BrokerComponent } from './users/broker/broker.component';
import { ClerkComponent } from './users/clerk/clerk.component';
import { JobtypeComponent } from './jobtype/jobtype.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MakeTextBoldPipe } from './jobtype/make-text-bold.pipe';

@NgModule({
  declarations: [DashboardComponent, FooterComponent, NavbarComponent, SidebarComponent, HomeComponent, WorkerComponent, ClientComponent, BrokerComponent, ClerkComponent, JobtypeComponent, PageNotFoundComponent, MakeTextBoldPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class DashboardModule { }
