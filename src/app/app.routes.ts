import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { Page404Component } from './pages/page404/page404.component';
import { EditProduitComponent } from './pages/edit-produit/edit-produit.component';
import { loggedGuard } from './services/logged.guard';
import { adminGuard } from './services/admin.guard';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent, canActivate: [loggedGuard] },
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: 'ajouter-produit',
    component: EditProduitComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'edit-produit/:id',
    component: EditProduitComponent,
    canActivate: [adminGuard],
  },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];
