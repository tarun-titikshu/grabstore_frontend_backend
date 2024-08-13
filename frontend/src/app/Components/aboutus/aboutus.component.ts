import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../partials/header/header.component';
import { FooterComponent } from '../partials/footer/footer.component';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [RouterModule,HeaderComponent,FooterComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {

}
