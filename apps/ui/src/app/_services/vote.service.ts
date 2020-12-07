import { Injectable } from '@angular/core';
import { IVote, IVoteConfig } from '@api-interfaces';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '@environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private apiUrl = `${environment.apiUrl}/votes`;

  constructor(private apiService: ApiService) {}

  query = (config: IVoteConfig = {}): Observable<IVote[]> => {
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

  getBySurveyAndUser = (config: IVoteConfig = {}): Observable<IVote> => {
    // Convert filters to URLSearchParams
    const params = {};
    Object.keys(config).forEach((key) => {
      params[key] = config[key];
    });
    return this.apiService.get(
      `${this.apiUrl}/${config.surveyId}/${config.userId}`,
      new HttpParams({ fromObject: params })
    );
  };

  save = (vote: IVote): Observable<IVote> => {
    if (vote._id) {
      return this.apiService.put(`${this.apiUrl}/${vote._id}`, vote);
    } else {
      return this.apiService.post(`${this.apiUrl}`, vote);
    }
  };
}
