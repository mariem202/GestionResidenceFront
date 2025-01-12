import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarteService {

   
  private apiUrl2 = 'http://localhost:8080/api/carts'; 
    constructor(private http: HttpClient) { }
  iduser=localStorage.getItem("id")
    // Fetch all rooms
   portcard(carte: any): Observable<any> {
    console.log(`${this.apiUrl2}/${this.iduser}`)
    return this.http.post<any>(`${this.apiUrl2}/${this.iduser}`, carte);
  }
     updateCart(id: number, updatedCart: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl2}/${id}`, updatedCart);
  }

  // Supprimer un panier
  deleteCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl2}/${id}`);
  }
}
