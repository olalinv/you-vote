import { Injectable } from '@angular/core';
import { ICategory } from '@api-interfaces';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private apiService: ApiService) {}

  query = (): Observable<ICategory[]> => {
    return this.apiService.get(this.apiUrl);
  };
}
