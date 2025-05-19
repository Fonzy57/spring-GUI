import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProduitService } from '../../services/crud/produit.service';
import { ImgSecuredDirective } from '../../directives/img-secured/img-secured.directive';

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
    ImgSecuredDirective,
  ],
})
export class AccueilComponent {
  auth: AuthService = inject(AuthService);
  produitService = inject(ProduitService);
  produits: Produit[] = [];

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: 'my-custom-snackbar',
    });
  }

  onClickBuy = (produit: Produit) => {
    this.openSnackBar(`Je viens d'acheter une ${produit.nom}`, 'x');
  };

  ngOnInit() {
    this.produitService.getAll();

    this.produitService.produits$.subscribe(
      (produits) => (this.produits = produits)
    );
  }
}
