// Angular
import { NgModule } from '@angular/core';
// App
import { SharedModule } from '@app/shared/shared.module';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentAddComponent } from './comment-add/comment-add.component';



@NgModule({
  declarations: [CommentListComponent, CommentAddComponent],
  imports: [
    CommentRoutingModule,
    SharedModule
  ]
})
export class CommentModule { }
