import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  connecte = false;
  role: string | null = null;

  constructor() {
    const jwt: string | null = localStorage.getItem('jwt');

    if (jwt !== null) {
      this.decodeJwt(jwt);
    }
  }

  // Init user infos (get jwt and role)
  decodeJwt(jwt: string) {
    localStorage.setItem('jwt', jwt);

    // On récupère la partie "body" du JWT
    const middleOfJWT = jwt.split('.')[1];

    // on décode la base 64
    const jwtBody = atob(middleOfJWT);

    // On transforme le json en objet JS
    const body = JSON.parse(jwtBody);

    this.role = body.role;

    this.connecte = true;
  }

  deconnexion() {
    localStorage.removeItem('jwt');
    this.connecte = false;
    this.role = null;
  }
}
