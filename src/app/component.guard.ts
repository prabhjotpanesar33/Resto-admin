import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { DotpeService } from 'src/app/dotpe.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';

import { EmployeeModel } from 'src/app/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class ComponentGuard implements CanActivate {
  employeeModel: EmployeeModel;
  constructor(private authService: DotpeService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private activatedRoute: ActivatedRoute,
) {


    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.employeeModel = JSON.parse(localStorage.getItem('employeeModel'));




    // console.log(pathName);
    // console.log(this.authService.employeeModel.roles[pathName]);

    return this.authService.user$.pipe(
      take(1),
      map(user => (user&&this.employeeModel.roles[route.url[0]['path']]&&this.employeeModel.isActive)  ? true : false),
      tap(canGo => {
        if (!canGo) {
           console.error('Access denied - Admins only')
         // this.toastr.error("You don't have sufficent permissions to access this.");
        }else{
          console.error('Access granted')
        }
      })
    );
  }

}
