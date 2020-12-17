import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountry } from '@api-interfaces';
import { environment } from '@environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = `${environment.apiUrl}/countries`;

  constructor(private apiService: ApiService) {}

  query = (): Observable<ICountry[]> => {
    return this.apiService.get(this.apiUrl);
  };
}
