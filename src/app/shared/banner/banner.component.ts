import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzButtonModule } from 'ng-zorro-antd/button';

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
  faArrowLeft = faArrowLeft
}
