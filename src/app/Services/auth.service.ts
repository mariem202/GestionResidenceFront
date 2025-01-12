import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

export interface User {
  
  role: string; // Le rôle de l'utilisateur (Admin, Etudiant, Employe, etc.)
  // Ajoutez d'autres propriétés si nécessaire
   userData: {
        id:string ,
        email: string,
    }
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/login'; // URL de l'API backend
    private apiUr = 'http://localhost:8080/signup'

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
        return this.http.post(this.apiUrl, { email, password });
    }

     register(data: any): Observable<any> {
        return this.http.post(this.apiUr, data);
    }
 
    getUserInfo() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('tok',this.decodeJWT(token))
      return this.decodeJWT(token);

    }
    return null;
  }

  // Fonction pour décoder un JWT
  private decodeJWT(token: string): any {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64); // Décoder en base64
    return JSON.parse(decodedPayload); // Retourne l'objet JSON
  }

   // Récupère les informations de l'utilisateur à partir du backend
  getUserDetails(): Observable<User | null> {
    const userInfo = this.getUserInfo();
     userInfo ? userInfo.sub : '';
    const email=userInfo.sub
    console.log('email',email )
    //const email = this.getUserEmail();
    if (email) {
       return this.http.get<User>(`http://localhost:8080/api/users/${email}`).pipe(
        catchError((error) => {
          // En cas d'erreur (utilisateur non trouvé), on retourne null
          console.error('Error fetching user details:', error);
          return of(null);
        })
      );
    }
    return of(null);
  }

  logout(): void {
    // Effacer le token ou autres informations d'authentification
    localStorage.removeItem('token');  // Par exemple, retirer le token JWT
     localStorage.removeItem('Role'); 
     localStorage.removeItem('id'); 
     localStorage.removeItem('email'); 
    sessionStorage.removeItem('token');  // Ou supprimer d'autres éléments de session
  }



}
