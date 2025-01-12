import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChambresService {

   private apiUrl = 'http://localhost:8080/api/chambres';  // Replace with your backend URL
private apiUrl2 = 'http://localhost:8080/api/chambres/asma';
  constructor(private http: HttpClient) { }

  // Fetch all rooms
  getChambres(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
   portchambre(chambre: any): Observable<any> {
    return this.http.post<any>(this.apiUrl2, chambre);
  }

    // Supprimer un panier
  deletechambre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getStatistiquesChambre(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistiques`);
  }
}
