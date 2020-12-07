// Angular
import { NgModule } from '@angular/core';
// App
import { SharedModule } from '@app/shared/shared.module';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyAddComponent } from './survey-add/survey-add.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { CommentListComponent } from '@app/comment/comment-list/comment-list.component';
import { CommentAddComponent } from '@app/comment/comment-add/comment-add.component';

@NgModule({
  declarations: [
    SurveyAddComponent,
    SurveyDetailComponent,
    CommentListComponent,
    CommentAddComponent,
  ],
  imports: [SharedModule, SurveyRoutingModule],
})
export class SurveyModule {}
