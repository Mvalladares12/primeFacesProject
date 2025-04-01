import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {HttpClient, provideHttpClient} from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/Lara';
import { CookieService } from 'ngx-cookie-service';
import {LoginGuardian} from './login/login-guardian';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    SweetAlert2Module,
    LoginGuardian,
    CookieService,
    providePrimeNG({
      theme: {
        preset: Lara,
        options:{
          darkModeSelector: '.my-app-dark'
        }
      }
    })
  ]
};
