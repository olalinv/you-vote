// Angular
import { NgModule } from '@angular/core';
// App
import { SharedModule } from '@app/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MySurveysComponent } from './my-surveys/my-surveys.component';

@NgModule({
  declarations: [MyProfileComponent, MySurveysComponent],
  imports: [
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
