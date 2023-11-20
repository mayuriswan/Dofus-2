import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SliderComponent } from "./components/slider/slider.component";
import { AsideComponent } from "./components/aside/aside.component";
import { StatsComponent } from "./components/stats/stats.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent, SliderComponent, AsideComponent, StatsComponent, FooterComponent]
})
export class AppComponent {
  title = 'ALIKEM';
}
