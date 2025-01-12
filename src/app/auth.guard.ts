import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const requiredRole = route.data['role']; // Récupérer le rôle requis depuis les données de la route

    return this.authService.getUserDetails().pipe(
      take(1), // Prendre un seul événement du flux
      map(user => {
        if (user) {
          console.log('User from auth guard:', user); // Vérification du rôle

          // Vérifie si l'utilisateur a le rôle requis
          if (requiredRole && user.role !== requiredRole) {

            localStorage.setItem('Role', user.role);
            console.log(user.role)
            this.router.navigate(['/login']); // Redirige si le rôle ne correspond pas
            return false;
          }
          localStorage.setItem('Role', user.role);
          localStorage.setItem('Email', user.userData.email);
          localStorage.setItem('id', user.userData.id);
          console.log(user.role)
          return true; // L'utilisateur est autorisé
        }
        // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
        this.router.navigate(['/login']);
        return false;
      }),
      catchError(() => {
        // Si une erreur se produit, on redirige également vers login
        this.router.navigate(['/login']);
        return [false];
      })
    );

  }
}


//   const token = localStorage.getItem('token');
  //   if (token) {
  //     return true;  // L'utilisateur est authentifié
  //   } else {
  //     // L'utilisateur n'est pas authentifié, rediriger vers la page de login
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }