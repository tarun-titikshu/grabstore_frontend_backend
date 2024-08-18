import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string | null = null;

  setRole(role: string) {
    this.role = role;
  }

  getRole(): string | null {
    return this.role;
  }

  isCustomer(): boolean {
    return this.role === 'CUSTOMER';
  }

  isStoreManager(): boolean {
    return this.role === 'STORE_MANAGER';
  }
}
