
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, RouteReuseStrategy, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';
import { CustomReuseStrategy } from './app/reuseables/custom-reuse-strategy';
import { appConfig } from './app/app.config';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { CurrencyConverterPipe } from './app/reuseables/pipes/currency-converter.pipe';


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),

    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    ),
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },


    // ✅ Needed for NgOptimizedImage
    provideHttpClient(),



    CurrencyConverterPipe,

    // 🔥 Service Worker
    // provideServiceWorker('combined-sw.js', {
    //   enabled: !isDevMode(),
    //   registrationStrategy: 'registerWhenStable:30000',
    // }),
    // ✅ Register combined service worker manually



  ]
}).catch((err) => console.error(err));
