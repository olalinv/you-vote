import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'you-vote-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss'],
})
export class SurveyDetailComponent implements OnInit {
  private surveyId: string;
  public survey: object = {};

  constructor(public router: Router, public route: ActivatedRoute) {
    // Params
    this.route.paramMap.subscribe((params) => {
      this.surveyId = params.get('surveyId');
    });
  }

  ngOnInit(): void {
    this.getSurvey(this.surveyId);
  }

  getSurvey = (surveyId: string) => {
    // this.surveyService.get(surveyId).subscribe((response: object) => {
    //   this.survey = response;
    // }, (error: string) => {
    //   console.log(error);
    // });
  }
}
