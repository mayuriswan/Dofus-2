import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-services/auth.service';
import { TokenService } from '../../services/token-service/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router,public authService: AuthService,
    private tokenService : TokenService) { }

  navigateTologin() {
    this.router.navigate(['/login']);
  }
  navigateTohome() {
    this.router.navigate(['/']);
  }
  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
    this.navigateTohome(); 
  }
}
