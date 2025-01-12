import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  matricule: string;
  filiere: string;
  sexe: string;
  email: string;
  motDePasse : string
   chambre: {
    id: number;
    etat: string;
    capacite: number;
    prix: number;
    libelle: string;
  } | null; //
}

@Injectable({
  providedIn: 'root'
})
export class EtudiantsService {

  private apiUrl = 'http://localhost:8080/api/etudiants'; // Remplacez par l'URL de votre API http://localhost:8080/api/etudiants
private apiLib = 'http://localhost:8080/api/chambres/libres';
private apiaffect = 'http://localhost:8080/api/chambres'
private apidelete = 'http://localhost:8080/api/etudiants/delete'
  constructor(private http: HttpClient) {}

   searchEtudiants2(nom: string, matricule: string, filiere: string): Observable<any> {
    const params: any = {};
    if (nom) params.nom = nom;
    if (matricule) params.matricule = matricule;
    if (filiere) params.filiere = filiere;

    return this.http.get(`${this.apiUrl}/search`, { params });
  }

   searchEtudiants3(nom: string, matricule: string, filiere: string) {
    return this.http.get<any[]>(`${this.apiUrl}/search`, {
      params: { nom, matricule, filiere }
    });
  }
  searchEtudiants(nom: string, matricule: string, filiere: string) {
    return this.http.get<any[]>(`${this.apiUrl}/search`, {
      params: {
        nom: nom || '',
        matricule: matricule || '',
        filiere: filiere || ''
      }
    });
}


  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }
   portEtud(Etudiant: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, Etudiant);
  }

   updateEtudiant(id: number, etudiantData: any) {
  return this.http.put<Etudiant>(`${this.apiUrl}/${id}`, etudiantData);
}

    // Supprimer un etud
  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apidelete}/${id}`, { responseType: 'text' as 'json' });
  }
   getChambreLib(): Observable<any> {
    return this.http.get<any>(this.apiLib);
  }


    affecterChambre(etudiantId: number, chambreId: number): Observable<any> {
    return this.http.post<any>(`${this.apiaffect}/${chambreId}/attribuer/${etudiantId}`,null);
  }

    libererChambre(etudiantId: number, chambreId: number): Observable<any> {
     return this.http.post<any>(`${this.apiaffect}/${chambreId}/liberer/${etudiantId}`,null);
  }

}
