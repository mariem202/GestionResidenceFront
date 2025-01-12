import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Paiement {
  libelleChambre: string;
  prenomEtudiant: string;
  idPaiement: number;
  datePaiement: string;
  nomEtudiant: string;
  matriculeEtudiant: string;
  montant: number;
  status: string;
 datePrevu: string
}
@Injectable({
  providedIn: 'root'
})


export class PeimentService {

 private apiUrl = "http://localhost:8080/paiement"; // Mettez à jour l'URL de votre API

 

  constructor(private http: HttpClient) {}

  getPaymentStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

  getPaymentinfo(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/etudiant?etudiantId=${id}`);
  }
  
 effectuerPaiement(id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/effectuer/${id}`,{}, { responseType: 'text'} );
  }

  getAllPayment(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paiements`);
  }
}
