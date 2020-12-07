import {
  Component,
  EventEmitter,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { IComment } from '@api-interfaces';

@Component({
  selector: 'you-vote-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss'],
})
export class CommentAddComponent implements OnInit {
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  @ViewChild('formDirective', { static: false })
  addCommentFormDirective: NgForm;

  @Output() commentAddEvent = new EventEmitter<IComment>();

  public comment: IComment = {};
  public addCommentForm: FormGroup;
  public isSubmitted = false;

  get f() {
    return this.addCommentForm.controls;
  }

  constructor(private ngZone: NgZone, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Init form
    this.initForm();
  }

  initForm = () => {
    this.addCommentForm = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  };

  onSubmitAddCommentForm = () => {
    this.isSubmitted = true;
    if (this.addCommentForm.invalid) {
      return;
    }

    this.prepareComment(this.addCommentForm.value);
    this.commentAddEvent.emit(this.comment);
    this.addCommentFormDirective.resetForm();
    this.isSubmitted = false;
  };

  prepareComment = (values: Object) => {
    Object.assign(this.comment, values);
  };

  triggerResize = () => {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  };
}
