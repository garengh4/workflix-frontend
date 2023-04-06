import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = localStorage.getItem("access_token");
    const overrideToken = localStorage.getItem('overrideToken');
    if (token != null && overrideToken != 'true') {
      authReq = req.clone({ 
        setHeaders:{
            'Authorization': 'Bearer '+token,
        }, });
    return next.handle(authReq);
      }
      else {
        return next.handle(authReq);
      }
  }
}
