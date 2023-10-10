import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './Animal/card/card.component';
import { AddComponent } from './Animal/add/add.component';
import { EditComponent } from './Animal/edit/edit.component';
import { SecurityComponent } from './Animal/security/security.component';
import { FaceRComponent } from './Animal/face-r/face-r.component';
import { PersonalComponent } from './Animal/personal/personal.component';
import { LoggedGuard } from './logged.guard';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { ProgramComponent } from './Animal/program/program.component';

const routes: Routes = [
  {path:'',redirectTo:'/login', pathMatch: 'full'}, 
  {path:'login',component:SecurityComponent,canActivate: [AuthGuard],pathMatch: 'full'},
  {path:'card',component:CardComponent, canActivate: [LoggedGuard],pathMatch: 'full'},
  {path:'add',component:AddComponent, canActivate: [LoggedGuard,AdminGuard],pathMatch: 'full'},
  {path:'edit',component:EditComponent, canActivate: [LoggedGuard],pathMatch: 'full'},
  {path:'face-r',component:FaceRComponent,pathMatch: 'full'},
  {path:'personal',component:PersonalComponent, canActivate: [LoggedGuard],pathMatch: 'full'},
  {path:'program',component:ProgramComponent, canActivate: [LoggedGuard],pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
