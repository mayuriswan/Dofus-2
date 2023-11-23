import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth-services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  constructor(private profileService : ProfileService,
    private authService : AuthService,
    
    private router: Router) { 
    }

    public user?: User;

  
  ngOnInit() {

    if(!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    // Get the user info
    
    this.profileService.getAllUserInfo().subscribe({
      next: (user) => {
        console.log(user);
        this.user = user;
      },
      error: (err) => {
        console.log(err);
      }
    });
    

    // Get Active tab from url
    // this.idOrder = this.router.url.split('/').pop() as unknown as number;

    
  }
  getTimeDifference(): string {
    const now = new Date();
    const createdAtDate = new Date(this.user?.creationDate as Date);
    const timeDifference = Math.abs(now.getTime() - createdAtDate.getTime());
    const hoursDifference = Math.floor(timeDifference / (1000 * 3600));
    
    if (hoursDifference < 24) {
      return ` ${hoursDifference} heure${hoursDifference !== 1 ? 's' : ''}`;
    } else {
      const daysDifference = Math.floor(hoursDifference / 24);
      return ` ${daysDifference} jour${daysDifference !== 1 ? 's' : ''}`;
    }
  }
}
