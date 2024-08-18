import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../partials/footer/footer.component';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  myForm: FormGroup;
  isBlank: boolean = false;
  showPassword: boolean = false;
  visibility: string = 'assets/password-show.png';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/),
      ]),
      role: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    this.isBlank = this.myForm.get('email')?.value.trim() === '';
    if (this.myForm.valid) {
      try {
        const response = await this.http
          .post('http://localhost:9093/login', this.myForm.value, {
            responseType: 'text',
          })
          .toPromise();
        console.log('Login Data:', this.myForm.value);

        this.authService.setRole(this.myForm.get('role')?.value);

        this.router.navigate(['/home']);
      } catch (error) {
        console.log('Error occurred, no user exists!');
      }
    } else {
      console.log('Form is invalid');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.visibility = this.showPassword ? 'assets/password-hide.png' : 'assets/password-show.png';
  }

  navigateToChangePassword() {
    this.router.navigate(['/change-password']);
  }
}
