import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  nom: string;
  prenom: string;
  numeroTelephone: string;
  numCnss: string;
  role: string;
  email: string;
  motDePasse : string
}
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

 
   private apiUrl = 'http://localhost:8080/api/employees'; // Remplacez par l'URL de votre API http://localhost:8080/api/etudiants

   constructor(private http: HttpClient) {}
 
   getEmployees(): Observable<Employee[]> {
     return this.http.get<Employee[]>(this.apiUrl);
   }
    portEmployee(Etudiant: any): Observable<any> {
     return this.http.post<Employee>(`${this.apiUrl}/ajouter`, Etudiant);
   }
 
    updateEmployee(id: number, etudiantData: any) {
   return this.http.put<Employee>(`${this.apiUrl}/${id}`, etudiantData);
 }
 
     // Supprimer un etud
   deleteEmployee(id: number): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/${id}`);
   }

 
 
}
