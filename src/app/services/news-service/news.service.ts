import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../../models/news.model';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:7016/api/News';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(private http:HttpClient) { }

  getNews() : Observable<News[]> {
    return this.http.get<News[]>(API_URL);
  }
}
