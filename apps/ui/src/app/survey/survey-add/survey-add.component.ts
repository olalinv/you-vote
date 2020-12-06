import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private surveyService: SurveyService,
    private surveytypeService: SurveytypeService,
    private _formBuilder: FormBuilder
  ) {
    // User
    this.user = this.accountService.userValue;
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
      (error: string) => {
        console.log(error);
      }
    );
  };

  getCategories = () => {
    this.categoryService.query().subscribe(
      (response: ICategory[]) => {
        this.categories = response;
      },
      (error: string) => {
        console.log(error);
      }
    );
  };

  getImages = () => {
    this.imageService.query().subscribe(
      (response: IImage[]) => {
        this.images = response;
      },
      (error: string) => {
        console.log(error);
      }
    );
  };

  saveSurvey = (survey: ICreateSurveyDto) => {
    this.surveyService.save(survey).subscribe(
      (response: ISurvey) => {
        console.log(response);
      },
      (error: string) => {
        console.log(error);
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
      this.surveytypeForm.value.question,
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
