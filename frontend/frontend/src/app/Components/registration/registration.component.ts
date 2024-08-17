import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterModule,CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {

  myForm: FormGroup;
  isBlank: boolean = false;

  constructor(private http:HttpClient,private router: Router) { 
    this.myForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      role: new FormControl('',[Validators.required])
    })
  }

  // registrationData = {
  //   email: '',
  //   password: '',
  //   role: '', 
  // }; 

  async onSubmit() {
    try {
      this.isBlank = (this.myForm.get('email')?.value.trim() === '');
      const response = await this.http.post('http://localhost:9093/signup',this.myForm.value,{responseType:'text'}).toPromise();
      console.log('Registration Data:', this.myForm);
      this.router.navigate(['/login']);
    }
    catch (error) {
      console.log('error occured while registering user !',this.myForm);
    }
    
  }
}
