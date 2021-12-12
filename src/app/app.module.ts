import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AngularFireModule } from "@angular/fire";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DotpeService } from './dotpe.service';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { from } from 'rxjs';
import {AuthGuard  } from "./auth.guard";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule ,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,

    AdminLayoutComponent,
    AuthLayoutComponent,
  ],
  providers: [DotpeService,
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
