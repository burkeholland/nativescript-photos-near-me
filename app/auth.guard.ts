import {Injectable} from "@angular/core";
import {Router, CanActivate} from '@angular/router';
import {Instagram} from "./config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (Instagram.accessToken) {
      this.router.navigate(["/"]);
      return true;
    }
    else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
