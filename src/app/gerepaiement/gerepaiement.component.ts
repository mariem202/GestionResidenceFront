import { Component } from '@angular/core';
import { Etudiant, EtudiantsService } from '../Services/etudiants.service';
import { Paiement, PeimentService } from '../Services/peiment.service';

@Component({
  selector: 'app-gerepaiement',
  templateUrl: './gerepaiement.component.html',
  styleUrls: ['./gerepaiement.component.scss']
})
export class GerepaiementComponent {
  etudiants: Paiement[] = [];
   showDetailPopup = false;
  isAffecter = false;

  chambres: any[] = []; // Liste des chambres récupérées
  selectedChambreId: number =0 // ID de la chambre sélectionnée


   filteredEtudiants: Paiement[] = [];
  searchTerm: string = '';

  selectedEtudiant: any = null;
    showPopup: boolean = false;  // Contrôle l’affichage de la popup
showAddPopup = false;
  loading = true;
  

  constructor(private etudiantService: PeimentService) {
     
  }

ngOnInit(): void {
 this.etudiantService.getAllPayment().subscribe(
    (data) => {
      this.etudiants = data;

      this.filteredEtudiants = [...data];
        // S'assurer que 'filteredEtudiants' a une copie des étudiants
        console.log(this.filteredEtudiants)
      this.loading = false;
    },
    (error) => {
      console.error('Erreur lors de la récupération des étudiants', error);
      this.loading = false;
    }
  );
}

getPayment (){
 this.etudiantService.getAllPayment().subscribe(
    (data) => {
      this.etudiants = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération des paiement', error);
      this.loading = false;
    }
  );
}

















filterEtudiants() {
  console.log('Recherche en cours pour:', this.searchTerm);
  
  // Si aucun terme de recherche n'est saisi, réinitialiser à tous les étudiants
  if (!this.searchTerm) {
    this.filteredEtudiants = [...this.etudiants];
  } else {
    const searchTermLower = this.searchTerm.toLowerCase();
    
    // Filtrer par nom, matricule, ou filière
    this.filteredEtudiants = this.etudiants.filter(etudiant =>
      (etudiant.nomEtudiant && etudiant.nomEtudiant.toLowerCase().includes(searchTermLower)) ||
      (etudiant.matriculeEtudiant && etudiant.matriculeEtudiant.toLowerCase().includes(searchTermLower)) 
    );
  }
  console.log('Etudiants filtrés:', this.filteredEtudiants);  // Vérifier que le filtrage fonctionne
}

// filterEtudiants() {
//     const [nom, matricule, filiere] = this.searchTerm.split(' ');
//     this.etudiantService.searchEtudiants(nom || '', matricule || '', filiere || '')
//       .subscribe(data => {
//         this.etudiants = data;
//       });
//   }

}
