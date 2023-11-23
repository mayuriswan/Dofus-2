import { ApplicationConfig } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorProvider } from './interceptors/auth.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Add this import

export const appConfig: ApplicationConfig = {
  providers: [TokenInterceptorProvider,
    provideRouter(routes),
              provideHttpClient(),
              ]};
