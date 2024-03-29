
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.isLoggedIn()){
            return true;
        }else {
            console.log('Not authorized');
            this.router.navigate(['/login']);
            return false;
        }
  }

  public isLoggedIn(): boolean{
    let status = false;
    if(localStorage.getItem('isLoggedIn')=="true"){
      status =true;
    }
    else {
      status = false;
    }
    return status;
  }
}