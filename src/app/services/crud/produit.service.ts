import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  http: HttpClient = inject(HttpClient);

  // BehaviorSubject est un observable qui contient une liste de produits et par défaut c'est un tableau vide
  // le "$" à la fin est une convention pour les observables
  readonly produits$ = new BehaviorSubject<Produit[]>([]);

  getAll() {
    this.http
      .get<Produit[]>('http://localhost:8080/produits')
      .subscribe((produits) => this.produits$.next(produits));
  }
}
