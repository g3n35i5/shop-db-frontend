import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import {Router} from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { ErrorHandler } from './error_handler';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    public errorHandler : ErrorHandler,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.url === null) {
          this.router.navigate(['/offline']);
        } else {
          this.errorHandler.handleError(err);
        }
      }
    });
  }
}
