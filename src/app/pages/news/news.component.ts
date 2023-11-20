import { NewsService } from './../../services/news-service/news.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  news:News[]= [];

  constructor(private newsService:NewsService){}

  ngOnInit(): void {
    this.newsService.getNews().subscribe({
      next: news => {
        this.news = news;
        console.log(this.news);
      },
      error: err => console.log(err)
    })
  }

}
