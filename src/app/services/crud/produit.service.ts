import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  Subscription,
  tap,
  throwError,
} from 'rxjs';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  http: HttpClient = inject(HttpClient);
  notification: NotificationService = inject(NotificationService);

  // BehaviorSubject est un observable qui contient une liste de produits et par défaut c'est un tableau vide
  // le "$" à la fin est une convention pour les observables
  readonly produits$ = new BehaviorSubject<Produit[]>([]);

  getAll() {
    this.http
      .get<Produit[]>('http://localhost:8080/produits')
      .subscribe((produits) => this.produits$.next(produits));
  }

  // TODO VOIR POUR CHECKER LE .pipe, le .tap etc
  save(produit: any) {
    return this.http.post('http://localhost:8080/produit', produit).pipe(
      tap(() => this.getAll()),
      catchError((error) => {
        // Handle the error if needed
        return throwError(() => error);
      })
    );
  }

  update(id: number, produit: any) {
    return this.http.put('http://localhost:8080/produit/' + id, produit).pipe(
      tap(() => this.getAll()),
      catchError((error) => {
        // Handle the error if needed
        return throwError(() => error);
      })
    );
  }
}
