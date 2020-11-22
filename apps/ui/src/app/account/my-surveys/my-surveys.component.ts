import { Component, OnInit } from '@angular/core';
import { ISurvey, ISurveyListConfig, IUser } from '@api-interfaces';
import { AccountService, SurveyService } from '@app/_services';

@Component({
  selector: 'you-vote-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.scss'],
})
export class MySurveysComponent implements OnInit {
  private user: IUser;
  public surveysCreatedByMe: ISurvey[];

  constructor(
    private accountService: AccountService,
    private surveyService: SurveyService
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys = () => {
    const surveyListConfig: ISurveyListConfig = {
      user: this.user._id,
    };
    this.surveyService.query(surveyListConfig).subscribe(
      (response: ISurvey[]) => {
        this.surveysCreatedByMe = response;
        console.log('userSurveys', this.surveysCreatedByMe);
      },
      (error: string) => {
        console.log(error);
      }
    );
  };
}
