import { Component, Input, OnInit } from '@angular/core';
import { ISurvey } from '@api-interfaces';

@Component({
  selector: 'you-vote-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {

  @Input() surveys: ISurvey[];
  @Input() mode = 'grid';

  constructor() { }

  ngOnInit(): void {
  }

}
