import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface PlainteSuggestion {
  id: number;
  description: string;
  categorie: string;
  type: string;
  statut: string;
   etudiant: {
    id: number;
    nom: string;
    email: number;
  } 
}

@Injectable({
  providedIn: 'root'
})
export class PleinteService {

   private apiUrl = 'http://localhost:8080/api/plaintes-suggestions'; // Remplacez par l'URL de votre API http://localhost:8080/api/etudiants
  
     constructor(private http: HttpClient) {}
     iduser=localStorage.getItem("id")
   
     getplaintes(): Observable<PlainteSuggestion[]> {
       return this.http.get<PlainteSuggestion[]>(this.apiUrl);
     }

     getplaintesByEtud(): Observable<PlainteSuggestion[]> {
       return this.http.get<PlainteSuggestion[]>(`${this.apiUrl}/etudiant/${this.iduser}`);
     }


      postplaintes(Etudiant: any): Observable<any> {
       return this.http.post<PlainteSuggestion>(`${this.apiUrl}/${this.iduser}`, Etudiant);
     }
   
      updateplaintes(id: number, etudiantData: any) {
     return this.http.put<PlainteSuggestion>(`${this.apiUrl}/${id}`, etudiantData);
   }
   
       // Supprimer un etud
     deleteplaintes(id: number): Observable<void> {
       return this.http.delete<void>(`${this.apiUrl}/${id}`);
     }

     getStatistiquesPlaintes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistiques`);
  }
  
}
