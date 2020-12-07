// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// App
import { MyAccountComponent } from './my-account/my-account.component';
import { MySurveysComponent } from './my-surveys/my-surveys.component';

const routes: Routes = [
  {
    path: 'me',
    component: MyAccountComponent,
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
