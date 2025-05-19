import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { ProduitService } from '../../services/crud/produit.service';
import { FileChooserComponent } from '../../components/file-chooser/file-chooser.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-produit',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    FileChooserComponent,
  ],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss',
})
export class EditProduitComponent implements OnInit {
  etats: Etat[] = [];
  etiquettes: Etiquette[] = [];
  produitEdite: Produit | null = null;
  photo: File | null = null;

  notification: NotificationService = inject(NotificationService);
  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  produitService = inject(ProduitService);

  formBuilder: FormBuilder = inject(FormBuilder);

  formulaire = this.formBuilder.group({
    nom: [
      'Nouveau produit',
      [Validators.required, Validators.maxLength(25), Validators.minLength(3)],
    ],
    code: ['prod-57', [Validators.required]],
    description: ['Une petite description', []],
    prix: [57000, [Validators.required, Validators.min(10)]],
    etat: [{ id: 1 }],
    etiquettes: [[] as Etiquette[]],
  });

  fichierEnvoyeParComposant(fichier: File | null) {
    this.photo = fichier;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametres) => {
      // Si on a une ID dans l'URL
      if (parametres['id']) {
        this.http
          .get<Produit>(environment.serverUrl + '/produit/' + parametres['id'])
          .subscribe((produit) => {
            this.formulaire.patchValue(produit);
            this.produitEdite = produit;
          });
      }
    });

    this.http
      .get<Etat[]>(environment.serverUrl + '/etats')
      .subscribe((listeEtat) => {
        this.etats = listeEtat;
      });

    this.http
      .get<Etiquette[]>(environment.serverUrl + '/etiquettes')
      .subscribe((listeEtiquettes) => {
        this.etiquettes = listeEtiquettes;
      });
  }

  onAddProduit(): void {
    if (this.formulaire.valid) {
      console.log('Le formulaire est valide : ', this.formulaire.value);

      // On vérifie si on fait une édition et on fait un PUT
      if (this.produitEdite) {
        /* TODO REFAIRE COMME POUR LE ADD EN AJOUTANT L'IMAGE */
        /* LE ADD EST JUSTE EN DESSOUS */

        this.produitService
          .update(this.produitEdite.id, this.formulaire.value)
          .subscribe({
            next: () => this.notification.show('Le produit a bien été modifié'),
            error: () =>
              this.notification.show('Problème de communication', 'error'),
          });
      } else {
        // sinon on fait un post

        const formData = new FormData();

        formData.set(
          'produit',
          new Blob([JSON.stringify(this.formulaire.value)], {
            type: 'application/json',
          })
        );

        if (this.photo) {
          formData.set('photo', this.photo);
        }

        this.http.post(`${environment.serverUrl}/produit`, formData).subscribe({
          next: (produit) => {
            console.log('Produit ajouté');
          },
          error: (error) => {
            console.error("Une erreur est survenue lors de l'ajout du produit");
          },
        });

        /* this.produitService.save(this.formulaire.value).subscribe({
          next: () => this.notification.show('Le produit a bien été ajouté'),
          error: () =>
            this.notification.show('Problème de communication', 'error'),
        }); */
      }

      // Redirect to home page after adding or editing product
      this.router.navigateByUrl('/accueil');
    } else {
      console.error('FORMULAIRE NON VALIDE !');
    }
  }

  compareId(oject1: { id: number }, object2: { id: number }): boolean {
    return oject1.id === object2.id;
  }
}
