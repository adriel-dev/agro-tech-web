import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get('Anonymous') !== null) {
      const newHeaders = request.headers.delete('Anonymous');
      const newRequest = request.clone({ headers: newHeaders });
      return next.handle(newRequest);
    }

    const jwtToken = localStorage.getItem('jwtToken');

    const requestWithAuthHeader = request.clone({
      setHeaders: { Authorization: `Bearer ${jwtToken}` }
    });


    return next.handle(requestWithAuthHeader);
  }
}
