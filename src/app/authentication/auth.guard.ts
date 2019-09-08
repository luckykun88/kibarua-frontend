import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private service: AuthService, private router: Router) {}

  canActivate() {
    if (this.service.authenticated) { return true; }

    return this.service.currentUserObservable
         .take(1)
         .map(user => !!user)
         .do(loggedIn => {
           if (!loggedIn) {
             console.log('access denied');
             this.router.navigate(['login']);
           }
       });
}

  canActivateChild() {
    if (this.service.authenticated) { return true; }

    return this.service.currentUserObservable
         .take(1)
         .map(user => !!user)
         .do(loggedIn => {
           if (!loggedIn) {
             console.log('access denied');
             this.router.navigate(['login']);
           }
       });
}

}
