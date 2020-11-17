// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Lib
import { MaterialModule } from '@material';
// App
import { SurveyListComponent } from '@app/_components/survey-list/survey-list.component';

@NgModule({
  declarations: [SurveyListComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SurveyListComponent,
  ],
})
export class SharedModule {}
