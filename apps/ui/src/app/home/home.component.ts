import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';

@Component({
  selector: 'you-vote-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit(): void {
  }

  checkUserStatus(): void {

  }

}
