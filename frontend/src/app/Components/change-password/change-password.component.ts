import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { FooterComponent } from '../partials/footer/footer.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule,ReactiveFormsModule,FooterComponent],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  visibilityOld: string = 'assets/password-show.png';
  visibilityNew: string = 'assets/password-show.png';
 
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    this.changePasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@#$!%?&])[A-Za-z\d@#$!%?&]{8,}$/)
      ]),
    });
  }

  async onSubmit() {
    if (this.changePasswordForm.valid) {
      try {
        const response = await this.http.post('http://localhost:9093/reset-password', this.changePasswordForm.value, { responseType: 'text' }).toPromise();
        console.log('Password changed successfully:', response);
        this.router.navigate(['/login']);
      } catch (error) {
        console.log('Error occurred while changing password:', error);
      }
    } else {
      console.log("Form is invalid");
    }
  }

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
    this.visibilityOld = this.showOldPassword ? 'assets/password-hide.png' : 'assets/password-show.png';
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
    this.visibilityNew = this.showNewPassword ? 'assets/password-hide.png' : 'assets/password-show.png';
  }
}

