import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { LoginGuard } from "src/app/login.guard";

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent , canActivate: [] },
];
