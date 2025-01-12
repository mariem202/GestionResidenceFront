import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   email: string = '';
    password: string = '';

    constructor(private authService: AuthService  , private router: Router) {}
  userInfo: any;

// login() {
//     this.authService.login(this.email, this.password).subscribe(
//         response => {
//             console.log('Login successful:', response);
//             localStorage.setItem('token', response.jwt);
//             this.userInfo = this.authService.getUserInfo(); 
//             console.log('User Info:', this.userInfo);

//             // Gestion de la redirection basée sur le rôle
//             if (this.userInfo.role.toLowerCase() === 'etudiant') {
//                 this.router.navigate(['/EtudDetails']);
//             } else if (this.userInfo.role.toLowerCase() === 'admin') {
//                 this.router.navigate(['/dashboard']);
//             } else {
//                 this.router.navigate(['/login']);
//             }
//         },
//         error => {
//             console.error('Login failed:', error);
//         }
//     );
// }
login() {
    this.authService.login(this.email, this.password).subscribe(
        response => {
            console.log('Login successful:', response);
            console.log('Token:', response.jwt); 
            
            // Stocker le token
            localStorage.setItem('token', response.jwt);

            // Récupérer les informations utilisateur après le login
            this.authService.getUserDetails().subscribe(user => {
                if (user) {  // Vérification si 'user' n'est pas null
                    console.log('User Info:', user);
                    localStorage.setItem('Role', user.role);
                    localStorage.setItem('Email', user.userData.email);
                    localStorage.setItem('id', user.userData.id);

                    // Redirection basée sur le rôle
                    if (user.role.toLowerCase() === 'admin') {
                        this.router.navigate(['/dashboard']);
                    } else if (user.role.toLowerCase() === 'etudiant') {
                        this.router.navigate(['/EtudDetails']);
                    }else if (user.role.toLowerCase() === 'employee') {
                        this.router.navigate(['/Pleinte']);
                    } else {
                        console.warn('Rôle non reconnu, redirection vers login.');
                        this.router.navigate(['/login']);
                    }
                } else {
                    console.error('User data is null, redirecting to login.');
                    this.router.navigate(['/login']);
                }
            });
        },
        error => {
            console.error('Login failed:', error);
        }
    );
}

}
