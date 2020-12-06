// Angular
import { NgModule } from '@angular/core';
// App
import { SharedModule } from '@app/shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [AboutRoutingModule, SharedModule],
})
export class AboutModule {}
