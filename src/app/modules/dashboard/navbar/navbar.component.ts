import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../../authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: any;

  role: Observable<any>;

  constructor(private auth: AuthService, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {}

  ngOnInit() {}


  logout() {
    document.getElementById('closeMod').click();
    console.log('logging out..');
    this.auth.logout();
  }
}
