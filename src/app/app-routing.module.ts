import { AuthGuard } from './authentication/auth.guard';
import { PageNotFoundComponent } from './modules/dashboard/page-not-found/page-not-found.component';
import { JobtypeComponent } from "./modules/dashboard/jobtype/jobtype.component";
import { BrokerComponent } from "./modules/dashboard/users/broker/broker.component";
import { ClerkComponent } from "./modules/dashboard/users/clerk/clerk.component";
import { ClientComponent } from "./modules/dashboard/users/client/client.component";
import { HomeComponent } from "./modules/dashboard/home/home.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { LoginComponent } from "./authentication/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WorkerComponent } from "./modules/dashboard/users/worker/worker.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "workers", component: WorkerComponent },
      { path: "clients", component: ClientComponent },
      { path: "clerks", component: ClerkComponent },
      { path: "brokers", component: BrokerComponent },
      { path: "jobtypes", component: JobtypeComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
