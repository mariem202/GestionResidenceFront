import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListEtudientComponent } from './list-etudient/list-etudient.component';
import { authGuard } from './auth.guard';
import { ListChambreComponent } from './list-chambre/list-chambre.component';
import { ListCarteComponent } from './list-carte/list-carte.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { ProfileComponent } from './profile/profile.component';
import { AddPlainteSuggestionComponent } from './add-plainte-suggestion/add-plainte-suggestion.component';
import { PlainteSuggestionComponent } from './plainte-suggestion/plainte-suggestion.component';
import { EditPlainteSuggestionComponent } from './edit-plainte-suggestion/edit-plainte-suggestion.component';
import { DetailchambreComponent } from './detailchambre/detailchambre.component';
import { FactureComponent } from './facture/facture.component';
import { RapportChambreComponent } from './rapport-chambre/rapport-chambre.component';
import { GerepaiementComponent } from './gerepaiement/gerepaiement.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
       
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'Etudiants',
        canActivate: [authGuard],
        data: { role: 'Admin' },
        component: ListEtudientComponent // Ajoutez cette ligne pour la route Users
      },{
        path: 'Chambres',
        canActivate: [authGuard],
        data: { role: 'Admin' },
        component: ListChambreComponent // Ajoutez cette ligne pour la route Users
      },{
        path: 'Carte',
        canActivate: [authGuard],
        data: { role: 'Etudiant' },
        component: ListCarteComponent // Ajoutez cette ligne pour la route Users
      },{
        path: 'Employee',
        canActivate: [authGuard],
        data: { role: 'Admin' },
        component: ListEmployeeComponent // Ajoutez cette ligne pour la route Users
      },{
        path: 'Paiement',
        canActivate: [authGuard],
        data: { role: 'Admin' },
        component: GerepaiementComponent// Ajoutez cette ligne pour la route Users
      },{
        path: 'AddPleinte',
        canActivate: [authGuard],
        data: { role: 'Etudiant' },
        component: AddPlainteSuggestionComponent// Ajoutez cette ligne pour la route Users
      },{
        path: 'sugg',
        canActivate: [authGuard],
        data: { role: 'Admin' },
        component: PlainteSuggestionComponent// Ajoutez cette ligne pour la route Users
      },{
        path: 'Pleinte',
        canActivate: [authGuard],
        data: { role: 'Employee' },
        component: EditPlainteSuggestionComponent// Ajoutez cette ligne pour la route Users
      },
      {
        path: 'facture',
       
        component: FactureComponent// Ajoutez cette ligne pour la route Users
      },
      {
        path: 'rapportchambre',
       
        component: RapportChambreComponent// Ajoutez cette ligne pour la route Users
      },
      {
        path: 'EtudDetails',
        // canActivate: [authGuard],
        // data: { role: 'ROLE_USER' },
        component: DetailchambreComponent// Ajoutez cette ligne pour la route Users
      },

      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
   {
    path: 'login',
    component: LoginComponent // Ajoutez cette ligne pour le chemin de connexion
  },
   {
    path: 'register',
    component: RegisterComponent // Ajoutez cette ligne pour le chemin de connexion
  }
];
