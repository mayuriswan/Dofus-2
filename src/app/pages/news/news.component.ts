import { NewsService } from './../../services/news-service/news.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { News } from '../../models/news.model';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  news:News[]= [];

  constructor(private newsService:NewsService,private router: Router , private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.newsService.getNews().subscribe({
      next: news => {
        this.news = news;
      },
      error: err => console.log(err)
    })
  }
  navigateToNewsDetails(newsId: News): void {
   console.log(newsId);
    this.router.navigate(['/news', newsId.id]);
  }
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
