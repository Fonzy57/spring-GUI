import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-validate-email',
  imports: [],
  templateUrl: './validate-email.component.html',
  styleUrl: './validate-email.component.scss',
})
export class ValidateEmailComponent {
  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  notification: NotificationService = inject(NotificationService);

  token: string = '';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametres) => {
      // Si on a un token dans l'URL
      if (parametres['token']) {
        this.token = parametres['token'];
        this.onValidationInscription();
      }
    });
  }

  onValidationInscription() {
    if (this.token) {
      this.http
        .post<any>(`${environment.serverUrl}/validate-email`, {
          token: this.token,
          consentementUtilisationDonnees: true,
        })
        .subscribe({
          next: (resultat) => {
            this.notification.show(
              '🎉 Incsription finalisée 🎉 Vous pouvez maintenant vous connecter',
              'valid'
            );
            console.log('OK : ', resultat);
          },
          error: (error) => {
            console.error('Erreur : ', error);
          },
        });
    }
  }
}
