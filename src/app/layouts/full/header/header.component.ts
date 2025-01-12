import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(private router: Router, private authService: AuthService) { }

  logout(): void {
    // Appel du service d'authentification pour effacer le token ou autres données de session
    this.authService.logout();

    // Rediriger l'utilisateur vers la page de connexion
    this.router.navigate(['/login']);
  }
}
