import { PolicesComponent } from './components/polices/polices.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './comunes/components/error.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent },
  {path: 'resources',component: ResourcesComponent},
  {path: 'polices',component:PolicesComponent},
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
