import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private service: AuthService, private router: Router) {}

  canActivate() {
    if (this.service.isLoggedIn()) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

  canActivateChild() {
    if (this.service.isLoggedIn()) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
