import { HttpInterceptorFn, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, tap, timeout, TimeoutError, throwError } from 'rxjs';

import { LoaderService } from './loader.service';
import { StoreDataService } from './store-data.service';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';
import { ToastService } from '../toast/toast.service';
import { QuickMessageService } from '../modals/quick-message/quick-message.service';
import { MessageService } from '../modals/message/message.service';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from '../modals/confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
import { SuccessStatusService } from '../success-check/service';


function isIOS(): boolean {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

export type MessageType = 'success' | 'error' | 'warning' | 'info';

export const PostHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const storeData = inject(StoreDataService);
  const dialog = inject(MatDialog);
  const toast = inject(QuickMessageService);
  const reqConfirmation = inject(ConfirmationDialogService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const modalMessageService = inject(MessageService);
  const noMessageToast = inject(SuccessStatusService)


  const clientTimezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';


  // 🔑 Ensure session validity check
  authService.checkLogin();

  // Attach Authorization Header
  let headers = req.headers || new HttpHeaders();
  if (authService.isLoggedIn && authService.token) {
    headers = headers.set('Authorization', `Token ${authService.token}`);
  }

  req = req.clone({ headers });

  const ua = window.navigator.userAgent;
  const isSafari =
    ua.includes('Safari') &&
    !ua.includes('Chrome') &&
    !ua.includes('CriOS') &&
    !ua.includes('Android') &&
    !ua.includes('Edg');

  const isPost = req.method === 'POST';
  const isGet = req.method === 'GET';



  // Toggle Loader
  if ((!req.url.includes('hideSpinner') && isGet) || isIOS() || req.url.includes('upload/') || isSafari) {
    if (!req.url.includes('hideSpinnerimportant') && !req.url.includes('coingecko')) {
      loaderService.show();
    }
  }

  if (isPost) {
    const activeBtn = document.activeElement as HTMLElement;
    loaderService.setLoadingButton(activeBtn);
    loaderService.show();
  }

  return next(req).pipe(
    timeout(49000), // 49-second safety timeout

    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          let body;

          if (event.body && typeof event.body === 'object' && !Array.isArray(event.body)) {
            body = event.body as any

            if (body.key) {
              body['status'] = "success";
              body['message'] = authService.auth_success_messages[authService.mode]
              // body['type'] = "modal"
            }

            console.log({body });

            // Display UI Messages
            if (body.type==='check') {
              noMessageToast.show()
            }
              else{
                if (body.message && body.status) {
                  if (body.type === 'modal') {
                    modalMessageService.show(body.message, body.status, body.title);
                  } else {
                    toast.show(body.message, body.status as MessageType);
                  }
                }
              }


            if (body.main) {
              storeData.setMultiple(body.main);
            }

            // Route Redirects
            if (body.next_page) {
              const next_page = body.next_page;
              if (body.next_page.confirm_redirect) {
                reqConfirmation.show({
                  title: '',
                  message: '',
                  confirmText: '',
                  cancelText: '',
                  onConfirm: () => {}
                });
              } else {
                router.navigate([next_page.url], { fragment: next_page.focus });
              }
            }

            // Enforce Pin Check
            // const wallet = storeData.get('wallet');
            // if (wallet && !wallet?.hasPin) {
            //   if (window.location.pathname !== '/set-pin') {
            //     router.navigate(['/set-pin']);
            //   }
            // }
          }
        }
      }
    }),

    // 🛠️ Global Interceptor Error Prevention
    catchError((err: HttpErrorResponse | TimeoutError | any) => {
      console.error('[HttpInterceptor Error]:', err);

      // Handle Unauthenticated State when waking up from background tab
      if (err.status === 401 || err.statusText === 'Unauthorized') {
        authService.logout(true);
        router.navigate(['/login']);
      } else if (err instanceof TimeoutError) {
        // toast.show('Connection timed out. Please check your network.', 'error');
        modalMessageService.show("Connection timed out. Please check your network.", "error")
      } else {
        // Fallback warning to notify user without breaking application state
        // toast.show('Network error occurred. Please refresh if issues persist.', 'warning');
        modalMessageService.show("Network error occurred. Please refresh if issues persist.", "info");
      }

      // Re-throw so component subscribers can handle specific failures if needed
      return throwError(() => err);
    }),

    // 🛑 Always clean up loading state to prevent blackouts/spins
    finalize(() => {
      loaderService.setLoadingButton(null);
      if (!req.url.includes('hideSpinner')) {
        loaderService.hide();
      }
    })
  );
};
