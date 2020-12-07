import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment, ICreateCommentDto } from '@api-interfaces';
import { environment } from '@environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private apiService: ApiService) {}

  getBySurveyId = (surveyId: string): Observable<IComment[]> => {
    return this.apiService.get(`${this.apiUrl}?survey=${surveyId}`);
  };

  save = (comment: ICreateCommentDto): Observable<IComment> => {
    if (comment._id) {
      return this.apiService.put(`${this.apiUrl}/${comment._id}`, comment);
    } else {
      return this.apiService.post(`${this.apiUrl}`, comment);
    }
  };
}
