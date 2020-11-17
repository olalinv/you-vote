import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyAddComponent } from './survey-add/survey-add.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';

const routes: Routes = [
  {
    path: 'add',
    component: SurveyAddComponent,
  },
  {
    path: ':surveyId',
    component: SurveyDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule {}
