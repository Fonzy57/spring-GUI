import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  imports: [
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    RouterLink,
    NgStyle,
  ],
})
export class AccueilComponent {
  http = inject(HttpClient);
  produits: Produit[] = [];

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: 'my-custom-snackbar',
    });
  }

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http
        .get<Produit[]>('http://localhost:8080/produits', {
          headers: {
            Authorization: 'Bearer ' + jwt,
          },
        })
        .subscribe((listeProduits) => {
          this.produits = listeProduits;
        });
    }
  }

  onClickBuy = (produit: Produit) => {
    this.openSnackBar(`Je viens d'acheter une ${produit.nom}`, 'x');
  };
}
