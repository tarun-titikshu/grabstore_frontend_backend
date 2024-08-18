import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { CustomerGuard } from './customer-guard.guard';

describe('CustomerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => CustomerGuard.prototype.canActivate.call(guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerGuard]  // Ensure the guard is provided
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
