// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Lib
import { MaterialModule } from '@material';
// App
import { SurveyListComponent } from '@app/_components/survey-list/survey-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SurveyListComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SurveyListComponent,
  ],
})
export class SharedModule {}
