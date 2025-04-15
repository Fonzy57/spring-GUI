import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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
  auth: AuthService = inject(AuthService);

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: 'my-custom-snackbar',
    });
  }

  ngOnInit() {
    this.http
      .get<Produit[]>('http://localhost:8080/produits')
      .subscribe((listeProduits) => {
        this.produits = listeProduits;
      });
  }

  onClickBuy = (produit: Produit) => {
    this.openSnackBar(`Je viens d'acheter une ${produit.nom}`, 'x');
  };
}
