import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { SecurityService } from "./security.service";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private securityService: SecurityService,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: 'BEARER ' + this.securityService.getCurrentToken()
            }
        });
        return next.handle(request)
            .pipe(tap(e => {
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            console.log('you are not logged in')
                                    // this.router.navigate(['/login']);
                        }
                    }
            }));
        }
}