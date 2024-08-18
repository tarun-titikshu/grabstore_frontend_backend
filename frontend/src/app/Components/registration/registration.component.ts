import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../partials/footer/footer.component';

@Component({
  selector: 'app-registration', 
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, ReactiveFormsModule,FooterComponent],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  myForm: FormGroup;
  isBlank: boolean = false;
  showPassword: boolean = false;
  visibility: string = 'assets/password-show.png';

  constructor(private http: HttpClient, private router: Router) { 
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/)
      ]),
      role: new FormControl('', [Validators.required])
    });
  }

  async onSubmit() {
    try {
      this.isBlank = (this.myForm.get('email')?.value.trim() === '');
      const response = await this.http.post('http://localhost:9093/signup', this.myForm.value, { responseType: 'text' }).toPromise();
      console.log('Registration Data:', this.myForm.value);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error occurred while registering user!', this.myForm.value);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.visibility = this.showPassword ? 'assets/password-hide.png' : 'assets/password-show.png';
  }
}
