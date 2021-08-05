import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        

        request = request.clone({ headers: request.headers.set('token', "token") });

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == 401) {
                    //goLogin
                }
                return throwError(error);
            }));
    }
}