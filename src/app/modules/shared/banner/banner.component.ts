import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    NzButtonModule,
    FontAwesomeModule
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  constructor(private router: Router) {}

  faArrowLeft = faArrowLeft

  navigateToProducts() {
    this.router.navigate(['/']);
  }
}
