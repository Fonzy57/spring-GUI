import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  connecte = false;

  constructor() {
    const jwt: string | null = localStorage.getItem('jwt');

    this.connecte = jwt !== null;
  }

  connexion(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.connecte = true;
  }

  deconnexion() {
    localStorage.removeItem('jwt');
    this.connecte = false;
  }
}
