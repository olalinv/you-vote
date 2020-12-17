import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegion } from '@api-interfaces';
import { environment } from '@environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private apiUrl = `${environment.apiUrl}/regions`;

  constructor(private apiService: ApiService) {}

  query = (): Observable<IRegion[]> => {
    return this.apiService.get(this.apiUrl);
  };
}
