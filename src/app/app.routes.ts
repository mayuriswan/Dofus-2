import { Routes } from '@angular/router';
import { RegistreComponent } from './pages/registre/registre.component';
import { NewsComponent } from './pages/news/news.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AuthGuard } from './guards/auth.guard';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';


export const routes: Routes = [
     // Default route
    { path: 'registre', component: RegistreComponent },
    {path:'login', component: LoginComponent},
    { path: '', component: NewsComponent },
    {path:'profil', component: ProfilComponent,    canActivate:[AuthGuard],
  },{ path: 'news/:id', component: NewsDetailsComponent }
  ];
