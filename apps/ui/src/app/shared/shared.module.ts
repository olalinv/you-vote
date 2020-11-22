// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Lib
import { MaterialModule } from '@material';
// App
import { SurveyListComponent } from '@app/_components/survey-list/survey-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SurveyListComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    SurveyListComponent,
  ],
})
export class SharedModule {}
