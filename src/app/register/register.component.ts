import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
 nom: string = '';
    prenom: string = '';
    dateNaissance: string = '';
    matricule: string = '';
    filiere: string = '';
    sexe: string = 'M'; // Valeur par défaut
    email: string = '';
    password: string = '';
    confirmPassword: string = ''; // Nouveau champ

    constructor(private authService: AuthService, private router: Router) {}

    register() {
        if (this.password !== this.confirmPassword) {
            alert('Les mots de passe ne correspondent pas !');
            return;
        }

        const userData = {
            nom: this.nom,
            prenom: this.prenom,
            dateNaissance: this.dateNaissance,
            matricule: this.matricule,
            filiere: this.filiere,
            sexe: this.sexe,
            email: this.email,
            password: this.password,
        };

        this.authService.register(userData).subscribe(
            response => {
                alert('Inscription réussie ! Vous allez être redirigé vers la page de connexion.');
                this.router.navigate(['/login']);
            },
            error => {
                alert('Une erreur est survenue lors de l\'inscription.');
                console.error('Erreur lors de l\'inscription :', error);
            }
        );
    }

}
