import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./../../../authentication/auth.service";
import { Component, OnInit } from "@angular/core";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireList } from '@angular/fire/database';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {

  username: any;

  role:  Observable<any>; 

  constructor(private auth: AuthService, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    var user = this.afAuth.auth.currentUser;
    this.username = user.displayName;

    var user = this.afAuth.auth.currentUser;
    var data = this.db.object(`users/${user.uid}`).valueChanges();
    this.role = data;
  }


  logout() {
    document.getElementById("closeMod").click();
    console.log("logging out..");
    this.auth.logout();
  }
}
