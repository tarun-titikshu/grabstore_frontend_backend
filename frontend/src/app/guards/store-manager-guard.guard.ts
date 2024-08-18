import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
// import { AuthService } from '../services/AuthService.service';
// import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreManagerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isStoreManager()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
