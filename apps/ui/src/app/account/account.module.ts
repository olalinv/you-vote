// Angular
import { NgModule } from '@angular/core';
// App
import { SharedModule } from '@app/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { MyAccountComponent } from './my-account/my-account.component';
import { MySurveysComponent } from './my-surveys/my-surveys.component';

@NgModule({
  declarations: [MyAccountComponent, MySurveysComponent],
  imports: [
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
