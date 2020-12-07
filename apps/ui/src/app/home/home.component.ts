import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IAnswer,
  ISurvey,
  ISurveyResult,
  ISurveyType,
  IUser,
} from '@api-interfaces';
import { AccountService, SharedService, SurveyService } from '@app/_services';

@Component({
  selector: 'you-vote-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: IUser;
  surveys: ISurvey[];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private surveyService: SurveyService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    // Subscriptions
    this.accountService.user.subscribe((user: IUser) => {
      this.user = user;
    });
    // Surveys
    this.getSurveys();
  }

  getSurveys = () => {
    this.surveyService.query().subscribe(
      (response: ISurvey[]) => {
        console.log(response);
        this.surveys = response;
        this.surveys.forEach((survey: ISurvey) => {
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
      (error: string) => {
        console.log(error);
      }
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

  checkUserStatus(): void {
    if (this.user) {
      this.router.navigateByUrl('/survey/add');
    } else {
      this.sharedService.openDialog('register');
    }
  }
}
