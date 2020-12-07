import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '@api-interfaces';

@Component({
  selector: 'you-vote-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() comments: IComment[];

  constructor() { }

  ngOnInit(): void {
  }

}
