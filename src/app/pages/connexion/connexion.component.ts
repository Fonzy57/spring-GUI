import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connexion',
  imports: [MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent {
  http = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  notification: NotificationService = inject(NotificationService);
  router: Router = inject(Router);
  auth: AuthService = inject(AuthService);

  formulaire = this.formBuilder.group({
    email: ['user@toto.fr', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
  });

  onConnection(): void {
    if (this.formulaire.valid) {
      // Ici faire un try catch pour être sûr que l'API est joignable
      this.http
        .post('http://localhost:8080/connexion', this.formulaire.value, {
          responseType: 'text',
        })
        .subscribe({
          next: (result) => {
            this.auth.connexion(result);
            this.router.navigateByUrl('/accueil');
          }, // ICI LE RESULT C'EST LE JWT
          error: (erreur) => {
            if (erreur.status === 401) {
              this.notification.show('Mauvais email ou mot de passe', 'error');
            }
          },
        });
    }
  }
}
