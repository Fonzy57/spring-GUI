import { Component } from '@angular/core';
import { AccueilComponent } from './pages/accueil/accueil.component';

@Component({
  selector: 'app-root',
  imports: [AccueilComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Hello Tetiana et Victor !';
}
