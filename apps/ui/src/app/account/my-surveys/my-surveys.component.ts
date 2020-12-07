import { Component, OnInit } from '@angular/core';
import {
  IAnswer,
  ISurvey,
  ISurveyListConfig,
  ISurveyResult,
  ISurveyType,
  IUser,
} from '@api-interfaces';
import { AccountService, SurveyService } from '@app/_services';

@Component({
  selector: 'you-vote-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.scss'],
})
export class MySurveysComponent implements OnInit {
  private user: IUser;
  public surveysCreatedByMe: ISurvey[];
  public surveysVotedByMe: ISurvey[];

  constructor(
    private accountService: AccountService,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    // Subscriptions
    this.accountService.user.subscribe((user: IUser) => {
      this.user = user;
    });
    // Surveys
    const surveyListConfig: ISurveyListConfig = {
      user: this.user._id,
    };
    this.getSurveysCreatedByMe(surveyListConfig);
    this.getSurveysVotedByMe(this.user._id);
  }

  getSurveysCreatedByMe = (surveyListConfig: ISurveyListConfig) => {
    this.surveyService.query(surveyListConfig).subscribe(
      (response: ISurvey[]) => {
        this.surveysCreatedByMe = response;
        this.surveysCreatedByMe.forEach((survey: ISurvey) => {
          if (survey.surveyResult && survey.surveyResult[0]) {
            survey.surveyResult[0].answers = this.getSurveyAnswers(
              survey.surveytype,
              survey.surveyResult[0]
            );
          } else {
            const surveyResult: ISurveyResult = {
              answers: survey.surveytype.answers,
              total: 0,
            };
            survey.surveyResult.push(surveyResult);
          }
        });
      },
      (error: string) => {}
    );
  };

  getSurveysVotedByMe = (userId: string) => {
    this.surveyService.getAllVotedByUser(userId).subscribe(
      (response: ISurvey[]) => {
        this.surveysVotedByMe = response;
        this.surveysVotedByMe.forEach((survey: ISurvey) => {
          if (survey.surveyResult && survey.surveyResult[0]) {
            survey.surveyResult[0].answers = this.getSurveyAnswers(
              survey.surveytype,
              survey.surveyResult[0]
            );
          } else {
            const surveyResult: ISurveyResult = {
              answers: survey.surveytype.answers,
              total: 0,
            };
            survey.surveyResult.push(surveyResult);
          }
        });
      },
      (error: string) => {}
    );
  };

  getSurveyAnswers = (surveyType: ISurveyType, surveyResult: ISurveyResult) => {
    const surveyAnswers: IAnswer[] = [];
    let totalCount = 0;
    surveyResult.answers.forEach((answer) => {
      totalCount += answer.count;
    });
    surveyType.answers.forEach((answer) => {
      const resultAnswer = surveyResult.answers.filter((item) => {
        return item._id === answer._id;
      });
      if (resultAnswer.length > 0) {
        // Add percent
        resultAnswer[0].percent = (resultAnswer[0].count / totalCount) * 100;
        const mergedAnswer = Object.assign(answer, resultAnswer[0]);
        surveyAnswers.push(mergedAnswer);
      } else {
        surveyAnswers.push(answer);
      }
    });
    return surveyAnswers;
  };
}
