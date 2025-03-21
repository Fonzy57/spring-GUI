import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  imports: [MatButtonModule, MatSnackBarModule],
})
export class AccueilComponent {
  http = inject(HttpClient);
  produits: any = [];

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: 'my-custom-snackbar',
    });
  }

  ngOnInit() {
    this.http
      .get<any[]>('http://localhost:8080/produits')
      .subscribe((listeProduits) => {
        this.produits = listeProduits;
      });
  }

  onClickBuy = (produit: any) => {
    this.openSnackBar(`Je viens d'acheter une ${produit.nom}`, 'x');
  };
}
