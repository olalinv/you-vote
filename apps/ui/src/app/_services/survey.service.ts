import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ISurvey, ISurveyListConfig, IVote } from '@api-interfaces';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrl = `${environment.apiUrl}/surveys`;

  constructor(private apiService: ApiService) {}

  query = (config: ISurveyListConfig = {}): Observable<ISurvey[]> => {
    // Convert filters to URLSearchParams
    const params = {};
    Object.keys(config).forEach((key) => {
      params[key] = config[key];
    });
    return this.apiService.get(
      this.apiUrl,
      new HttpParams({ fromObject: params })
    );
  };

  get = (surveyId: string): Observable<ISurvey> => {
    return this.apiService.get(
      `${this.apiUrl}/${surveyId}`,
      new HttpParams({ fromObject: {} })
    );
  };

  save = (survey: ISurvey): Observable<ISurvey> => {
    if (survey._id) {
      return this.apiService.put(`${this.apiUrl}/${survey._id}`, survey);
    } else {
      return this.apiService.post(`${this.apiUrl}`, survey);
    }
  };

  delete = (surveyId: string): Observable<ISurvey> => {
    return this.apiService.delete(`${this.apiUrl}/${surveyId}`);
  };
}
