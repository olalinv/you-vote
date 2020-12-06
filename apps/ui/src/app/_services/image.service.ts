import { Injectable } from '@angular/core';
import { IImage } from '@api-interfaces';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = `${environment.apiUrl}/images`;

  constructor(private apiService: ApiService) {}

  query = (): Observable<IImage[]> => {
    return this.apiService.get(this.apiUrl);
  };
}
