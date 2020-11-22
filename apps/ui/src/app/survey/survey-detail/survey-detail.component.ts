import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ISurvey, IUser } from '@api-interfaces';
import { AccountService, SurveyService } from '@app/_services';

@Component({
  selector: 'you-vote-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss'],
})
export class SurveyDetailComponent implements OnInit {
  private surveyId: string;
  public survey: ISurvey;

  private user: IUser;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private accountService: AccountService
    ) {
    // Params
    this.route.paramMap.subscribe((params) => {
      this.surveyId = params.get('surveyId');
    });
    // User
    console.log(this.accountService.userValue);
  }

  ngOnInit(): void {
    this.getSurvey(this.surveyId);
  }

  getSurvey = (surveyId: string) => {
    this.surveyService.get(surveyId).subscribe((response: ISurvey) => {
      this.survey = response;
    }, (error: string) => {
      console.log(error);
    });
  }
}
