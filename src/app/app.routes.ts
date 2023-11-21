import { Routes } from '@angular/router';
import { RegistreComponent } from './pages/registre/registre.component';
import { NewsComponent } from './pages/news/news.component';


export const routes: Routes = [
     // Default route
    { path: 'registre', component: RegistreComponent },
    { path: '', component: NewsComponent },
  ];
