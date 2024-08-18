import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { StoreManagerGuard } from './store-manager-guard.guard';

describe('StoreManagerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => StoreManagerGuard.prototype.canActivate.call(guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreManagerGuard]  // Ensure the guard is provided
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
