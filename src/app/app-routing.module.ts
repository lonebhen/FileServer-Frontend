import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  
    { path: '', redirectTo: '/login', pathMatch: 'full'} ,
    { path: "login", component: LoginComponent},
    { path: "signup", component: SignUpComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    {
      path: "user",
      canActivate: [AuthGuard],
      loadChildren: () =>
      import('./Modules/user/user.module').then((m) => m.UserModule),
      
      
    },
    { path: "**", component: NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

