import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'you-vote-survey-add',
  templateUrl: './survey-add.component.html',
  styleUrls: ['./survey-add.component.scss'],
})
export class SurveyAddComponent implements OnInit {

  questionFormGroup: FormGroup;
  categoryFormGroup: FormGroup;
  imageFormGroup: FormGroup;

  categories = [
    {
      id: 1,
      value: 'Política',
    },
    {
      id: 2,
      value: 'Economía',
    },
  ];

  images = [
    {
      id: 1,
      value: 'Imagen 1',
    },
    {
      id: 2,
      value: 'Imagen 2',
    },
  ];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.questionFormGroup = this._formBuilder.group({
      question: ['', Validators.required],
    });
    this.categoryFormGroup = this._formBuilder.group({
      category: ['', Validators.required],
    });
    this.imageFormGroup = this._formBuilder.group({
      image: ['', Validators.required],
    });
  }
}
