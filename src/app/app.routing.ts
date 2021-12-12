import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './auth.guard';
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { redirectUnauthorizedTo } from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes =[

  {

    path: '',
    canActivate: [AngularFireAuthGuard],
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
   {
    path: '',
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: AdminLayoutComponent,
    children: [
      {
        path: '',

        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },
   {
    path: '',
    component: AuthLayoutComponent,

    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  },
   {
    path: '**',
    redirectTo: 'dashboard',
    canActivate: [AuthGuard]

  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
