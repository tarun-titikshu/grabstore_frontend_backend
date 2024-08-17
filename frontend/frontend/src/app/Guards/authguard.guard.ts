import { HttpClient, HttpContext } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
const http = inject(HttpClient);
// const response = http.post('http://localhost:9093/login',this.myForm.value,{responseType:'text'}).toPromise();
return true;


};
