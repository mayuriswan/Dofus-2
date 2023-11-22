import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/registre']);
  }

}
