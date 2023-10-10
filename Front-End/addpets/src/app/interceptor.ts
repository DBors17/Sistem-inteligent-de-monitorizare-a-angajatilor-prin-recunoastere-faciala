import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {

    if (sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: <string>sessionStorage.getItem('token')
        }
      });
    }
    return next.handle(req)
      .pipe(
        // Retry on failure
        // retry(2),

        // Handle errors
        catchError((error: HttpErrorResponse) => {
          // TODO: Add error handling logic here
          if (error.status === 0 || error.status === 403) {
            this.router.navigate(['login']);
            // seiunea a expirat
            // this.loginService.errorSessionExpired();
          }

          if (error.status === 403 || error.status === 401 || error.status === 500) {
            Swal.fire({
              title: 'Eroare',
              text: 'Parola/Login incorect',
              icon: 'warning',
              showCancelButton: false,
              confirmButtonText: 'Yes'
            });
            // seiunea a expirat
            // this.loginService.errorSessionExpired();
          }
          // console.log(`HTTP Error: ${req.url}`);
          // console.log('Eroare: ' + error.status);
          return throwError(error);
        }),

        // PROFILING
        finalize(() => {
          const profilingMsg = `${req.method} "${req.urlWithParams}"`;
          // console.log(profilingMsg);
        })
      );
  }
}
