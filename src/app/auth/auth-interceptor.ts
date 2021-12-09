import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthService } from "app/service/user/user-auth.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userAuthService: UserAuthService,
                private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }

        const token = this.userAuthService.getToken();

        req = this.addToken(req,token);

        return next.handle(req).pipe(
            catchError(
                (error:HttpErrorResponse) => {
                    if(error.status === 401) {
                        this.router.navigate(['login']);
                    } else if(error.status === 403) {
                        this.router.navigate(['forbidden']);
                    } else if(error.status === 404) {
                        return throwError(error.error);
                    }
                    return throwError("Impossible d'accéder à cette page")
                }
            )
        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone(
            {
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            }
        )
    }
}
