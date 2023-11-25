import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../../models/news.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_URL = `${environment.apiUrl}/News`;

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(private http:HttpClient) { }

  getNews() : Observable<News[]> {
    return this.http.get<News[]>(API_URL);
  }
  getNewsById(id: number): Observable<News> {
    const url = `${API_URL}/${id}`;
    return this.http.get<News>(url);
  }
}
