import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ICategory,
  ICreateSurveyDto,
  IImage,
  ISurvey,
  ISurveyType,
  IUser,
} from '@api-interfaces';
import {
  AccountService,
  CategoryService,
  ImageService,
  SharedService,
  SurveyService,
  SurveytypeService,
} from '@app/_services';

@Component({
  selector: 'you-vote-survey-add',
  templateUrl: './survey-add.component.html',
  styleUrls: ['./survey-add.component.scss'],
})
export class SurveyAddComponent implements OnInit {
  private user: IUser;
  private survey: ICreateSurveyDto;
  categories: ICategory[];
  images: IImage[];
  surveytypes: ISurveyType[];

  questionForm: FormGroup;
  surveytypeForm: FormGroup;
  categoryForm: FormGroup;
  imageForm: FormGroup;
  isSubmitted = false;
  isSaved = false;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private surveyService: SurveyService,
    private surveytypeService: SurveytypeService,
    private sharedService: SharedService,
    private _formBuilder: FormBuilder
  ) {
    // Subscriptions
    this.accountService.user.subscribe((user: IUser) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.initQuestionForm();
    this.getTypes();
    this.getCategories();
    this.getImages();
  }

  initQuestionForm = () => {
    this.questionForm = this._formBuilder.group({
      question: ['', Validators.required],
    });
    this.surveytypeForm = this._formBuilder.group({
      surveytype: ['', Validators.required],
    });
    this.categoryForm = this._formBuilder.group({
      category: ['', Validators.required],
    });
    this.imageForm = this._formBuilder.group({
      image: ['', Validators.required],
    });
  };

  getTypes = () => {
    this.surveytypeService.query().subscribe(
      (response: ISurveyType[]) => {
        this.surveytypes = response;
      },
      (error: string) => {}
    );
  };

  getCategories = () => {
    this.categoryService.query().subscribe(
      (response: ICategory[]) => {
        this.categories = response;
      },
      (error: string) => {}
    );
  };

  getImages = () => {
    this.imageService.query().subscribe(
      (response: IImage[]) => {
        this.images = response;
      },
      (error: string) => {}
    );
  };

  saveSurvey = (survey: ICreateSurveyDto) => {
    this.surveyService.save(survey).subscribe(
      (response: ISurvey) => {
        this.isSaved = true;
        this.sharedService.openSnackBar('Se guardó la encuesta');
        this.router.navigateByUrl('/account/my-surveys');
      },
      (error: string) => {
        this.sharedService.openSnackBar(error);
      }
    );
  };

  onSubmit() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (
      this.questionForm.invalid ||
      this.surveytypeForm.invalid ||
      this.categoryForm.invalid ||
      this.imageForm.invalid
    ) {
      return;
    }

    // form is valid
    this.prepareSurvey(
      this.questionForm.value.question,
      this.surveytypeForm.value.surveytype,
      this.categoryForm.value.category,
      this.imageForm.value.image
    );
    this.saveSurvey(this.survey);
  }

  prepareSurvey = (
    question: string,
    surveytype: string,
    category: string,
    image: string
  ) => {
    this.survey = {
      category: category,
      image: image,
      question: question,
      surveytype: surveytype,
      user: this.user._id,
    };
  };
}
