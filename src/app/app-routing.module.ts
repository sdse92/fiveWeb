import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main-page/main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  },
  {
    path: 'main',
    pathMatch: 'full',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'course/:id',
    pathMatch: 'full',
    component: CourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
