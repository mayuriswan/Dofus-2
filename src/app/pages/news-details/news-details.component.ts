import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { News } from '../../models/news.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news-service/news.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent {
  news: News | undefined;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private sanitizer: DomSanitizer,
    private router: Router // Replace with your actual news service
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const newsId = Number(params.get('id'));
      this.newsService.getNewsById(newsId).subscribe(result => {
        this.news = result;
      });
    
  });
}
sanitizeHtml(html: string): SafeHtml {
  console.log(html);
  return this.sanitizer.bypassSecurityTrustHtml(html);
  
}
navigateToHome(): void {
  console.log("navigateToHome");
  this.router.navigate(['/']);
}

navigateToNews(): void {
  this.router.navigate(['/news']);
}
}