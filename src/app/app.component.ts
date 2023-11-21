import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SliderComponent } from "./components/slider/slider.component";
import { AsideComponent } from "./components/aside/aside.component";
import { StatsComponent } from "./components/stats/stats.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NewsComponent } from './pages/news/news.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; // assuming you store routes in app.routes.ts


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HttpClientModule,NewsComponent,CommonModule, RouterOutlet, HeaderComponent, SliderComponent, AsideComponent, StatsComponent, FooterComponent]
})
export class AppComponent {
  title = 'ALIKEM';
}
