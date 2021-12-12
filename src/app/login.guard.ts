import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DotpeService } from './dotpe.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {tap, take, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: DotpeService,
    private afAuth: AngularFireAuth,
    private router: Router) {


    }
    canActivate(): Observable<boolean> {

      return this.authService.currentUserObservable.pipe(
        take(1),
        map(user => {

            return !user
        }),
        tap( loggedIn => {

            if (!loggedIn) {
                console.error("access denied");
                this.router.navigate(['/']);
            }
        })
    );

    }



}
