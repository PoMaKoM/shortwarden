import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private readonly apiUrl = '/api/v1/links';

  private http = inject(HttpClient);

  createTemporaryLink(url: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/temporary`, { url });
  }
}
