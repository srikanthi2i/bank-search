import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HOST } from 'src/app/environments/environments';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      req = req.clone({
        url: `${HOST}${req.url}`,
        headers: req.headers.set('Content-Type', 'application/json')
      });
      return next.handle(req).pipe(
        tap(evt => {}),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            return throwError(err);
          }
        })
      );
    }
}
