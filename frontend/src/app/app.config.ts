import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreManagerGuard } from './guards/store-manager-guard.guard';
import { CustomerGuard } from './guards/customer-guard.guard';
import { AuthService } from './services/auth-service.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideHttpClient(), provideAnimationsAsync()  ,AuthService,
    StoreManagerGuard,
    CustomerGuard, provideAnimationsAsync(),]
 
};

