import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-produit',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss',
})
export class EditProduitComponent implements OnInit {
  etats: Etat[] = [];
  etiquettes: Etiquette[] = [];

  http = inject(HttpClient);

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
    etiquettes: [[]],
  });

  ngOnInit() {
    this.http
      .get<Etat[]>('http://localhost:8080/etats')
      .subscribe((listeEtat) => {
        this.etats = listeEtat;
      });

    this.http
      .get<Etat[]>('http://localhost:8080/etiquettes')
      .subscribe((listeEtiquettes) => {
        this.etiquettes = listeEtiquettes;
      });
  }

  onAddProduit() {
    if (this.formulaire.valid) {
      console.log('Le formulaire est valide : ', this.formulaire.value);

      this.http
        .post('http://localhost:8080/produit', this.formulaire.value)
        .subscribe((result) => console.log(result));
    } else {
      console.log('FORMULAIRE NON VALIDE !');
    }
  }
}
