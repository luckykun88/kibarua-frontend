import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  private userDetails: firebase.User = null;
  private user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.user = afAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        console.log(this.userDetails);
      } else {
        this.userDetails = null;
      }
    });
  }

  getUserRole() {
    var user = this.afAuth.auth.currentUser;
    if (user) {
      var getUserInfo = firebase.database().ref("users/" + user.uid);
      var res = getUserInfo.once("value", function(snapshot) {
        console.log(snapshot.val());
        return snapshot.val();
      });
    }
    return res;
  }

  getUserState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(["dashboard"]);
          new firebase.auth.EmailAuthProvider();
        }
      });
  }

  createUser(user) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile({
          displayName: user.fullName
        });
        this.insertUserData(userCredential).then(() => {
          console.log("display name created");
          console.log("used added to firebase database");
          this.router.navigate(["login"]);
        });
      })
      .catch(error => console.log(error));
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    let path = `users/${userCredential.user.uid}`; // Endpoint on firebase
    let data = {
      email: this.newUser.email,
      fullName: this.newUser.fullName,
      role: this.newUser.role
    };

    return this.db
      .object(path)
      .update(data)
      .catch(error => console.log(error));
  }

  // getAllUsers(){
  //   return this.db.list('users').snapshotChanges();
  // }

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["login"]);
    });
  }
}
