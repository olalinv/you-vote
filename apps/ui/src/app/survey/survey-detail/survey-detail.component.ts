import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import {
  IAnswer,
  IComment,
  ISurvey,
  ISurveyResult,
  ISurveyType,
  IUser,
  IVote,
} from '@api-interfaces';
import {
  AccountService,
  CommentService,
  SharedService,
  SurveyService,
  VoteService,
} from '@app/_services';

@Component({
  selector: 'you-vote-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss'],
})
export class SurveyDetailComponent implements OnInit {
  private surveyId: string;
  survey: ISurvey;
  user: IUser;
  vote: IVote;

  myVote: number;
  submitted = false;

  surveyAnswers: IAnswer[] = [];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private surveyService: SurveyService,
    private voteService: VoteService,
    private commentService: CommentService,
    private sharedService: SharedService
  ) {
    // Params
    this.route.paramMap.subscribe((params) => {
      this.surveyId = params.get('surveyId');
    });
    // User
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    if (this.user) {
      // Vote
      this.vote = {
        surveyId: this.surveyId,
        userId: this.user._id,
      };
      this.getVote(this.vote);
    }
    this.getSurvey(this.surveyId);
  }

  getSurvey = (surveyId: string) => {
    this.surveyService.get(surveyId).subscribe(
      (response: ISurvey) => {
        this.survey = response;
        if (response.surveyResult[0]) {
          this.surveyAnswers = this.getSurveyAnswers(
            response.surveytype,
            response.surveyResult[0]
          );
        } else {
          this.surveyAnswers = response.surveytype.answers;
        }
        this.getComments(surveyId);
      },
      (error: string) => {
        console.log(error);
      }
    );
  };

  getVote = (vote: IVote) => {
    this.voteService.getBySurveyAndUser(vote).subscribe(
      (response: IVote) => {
        console.log('myVote', response);
        if (response) {
          this.vote = response;
          if (response.answerId) {
            this.myVote = this.vote.answerId;
          }
        }
      },
      (error: string) => {
        console.log(error);
      }
    );
  };

  getComments = (surveyId: string) => {
    this.commentService.getBySurveyId(surveyId).subscribe(
      (response: IComment[]) => {
        this.survey.comments = response;
      },
      (error: string) => {
        console.log(error);
      }
    );
  };

  saveVote = (answerId: number) => {
    console.log('vote', this.vote);
    const vote: IVote = JSON.parse(JSON.stringify(this.vote));
    vote.answerId = answerId;
    this.voteService.save(vote).subscribe(
      (response: IVote) => {
        console.log(response);
      },
      (error: string) => {
        console.log(error);
      }
    );
  };

  getSurveyAnswers = (surveyType: ISurveyType, surveyResult: ISurveyResult) => {
    const surveyAnswers: IAnswer[] = [];
    const totalCount = surveyResult.total;
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

  openDialog(component: string): void {
    this.sharedService.openDialog(component);
  }

  onVoteChange = ($event: MatRadioChange) => {
    this.saveVote($event.value);
  };

  onCommentAddChange = (event: IComment) => {
    console.log(event);
  };
}
