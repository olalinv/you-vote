import { Injectable } from '@angular/core';
import { ISurveyType } from '@api-interfaces';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SurveytypeService {

  private apiUrl = `${environment.apiUrl}/surveytypes`;

  constructor(private apiService: ApiService) {}

  query = (): Observable<ISurveyType[]> => {
    return this.apiService.get(this.apiUrl);
  };
}
