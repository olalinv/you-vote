// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// App
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MySurveysComponent } from './my-surveys/my-surveys.component';

const routes: Routes = [
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  {
    path: 'my-surveys',
    component: MySurveysComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
