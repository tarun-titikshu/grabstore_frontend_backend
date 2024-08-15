import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../partials/footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  // router:RouterModule;
  myForm: FormGroup;
  isBlank: boolean = false;

  constructor(private http:HttpClient,private router: Router) { 
    this.myForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      role: new FormControl('',[Validators.required])
    })
  }

  async onSubmit() {
  this.isBlank = (this.myForm.get('email')?.value.trim() === '');
   if (this.myForm.valid) {
    try {
      
      const response = await this.http.post('http://localhost:9093/login',this.myForm.value,{responseType:'text'}).toPromise();
      console.log('Login Data:', this.myForm);
      this.router.navigate(['/home']);
    } catch (error) {
      console.log('error occured, no user exists!');
    }
    
   }
   else {
    console.log("form is invalid")
    
   }
  
  }
}
