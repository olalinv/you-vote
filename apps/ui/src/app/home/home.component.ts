import { Component, OnInit } from '@angular/core';
import { ISurvey } from '@api-interfaces';
import { User } from '@app/_models';
import { SurveyService } from '@app/_services';

@Component({
  selector: 'you-vote-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  surveys: ISurvey[];
  user: User;

  constructor(
    private surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys = () => {
    this.surveyService.query().subscribe((response: ISurvey[]) => {
      this.surveys = response;
      console.log(this.surveys);
    }, (error: string) => {
      console.log(error);
    });
  }

  checkUserStatus(): void {

  }

}
