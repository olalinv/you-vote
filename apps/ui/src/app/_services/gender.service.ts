import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGender } from '@api-interfaces';
import { environment } from '@environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private apiUrl = `${environment.apiUrl}/genders`;

  constructor(private apiService: ApiService) {}

  query = (): Observable<IGender[]> => {
    return this.apiService.get(this.apiUrl);
  };
}
