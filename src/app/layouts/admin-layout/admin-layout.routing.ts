import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AuthGuard } from 'src/app/auth.guard';
import { LoginGuard } from 'src/app/login.guard';
import { ComponentGuard } from "src/app/component.guard";
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent , pathMatch: 'full' , canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent , pathMatch: 'full' , canActivate: [] },
]
