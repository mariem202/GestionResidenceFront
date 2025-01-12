import { Component } from '@angular/core';
import { PlainteSuggestion, PleinteService } from '../Services/pleinte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-plainte-suggestion',
  templateUrl: './edit-plainte-suggestion.component.html',
  styleUrls: ['./edit-plainte-suggestion.component.scss']
})
export class EditPlainteSuggestionComponent {

    plaintes: any[] = [];
      nouvelEtudiant = {
      description: '',
      categorie: '',
      type: 'PLAINTE',
      statut: '',
   
    };
    editMode = false;
    selectedEtudiant: any = null;
    showPopup: boolean = false;  // Contrôle l’affichage de la popup
    showAddPopup = false;
  
      constructor(private PleinteService: PleinteService) {
    
      }
  
  ngOnInit(): void {
   this.PleinteService.getplaintes().subscribe(
      (data) => {
        this.plaintes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants', error);
      }
    );
  }
openEditPopup(etudiant: PlainteSuggestion) {
  this.editMode = true; // Activer le mode édition
  this.showAddPopup = true; // Ouvrir la popup
  this.nouvelEtudiant = { ...etudiant }; // Pré-remplir les données de l'étudiant
  this.selectedEtudiant = etudiant; // Stocker l'étudiant sélectionné
}

updateEtudiant() {
  if (this.selectedEtudiant) {
    const updatedData = {
      ...this.nouvelEtudiant,
    };

    this.PleinteService.updateplaintes(this.selectedEtudiant.id, updatedData).subscribe({
      next: (response) => {
        Swal.fire(
          'Succès!',
          'L\'étudiant a été modifié avec succès.',
          'success'
        );
        // Mettre à jour la liste localement
        // Mettre à jour la liste localement
        const index = this.plaintes.findIndex((e) => e.id === this.selectedEtudiant.id);
        if (index !== -1) {
          this.plaintes[index] = response;
        }
        this.closeAddPopup();
      },
      error: (error) => {
        Swal.fire(
          'Erreur!',
          'Il y a eu une erreur lors de la modification de l\'étudiant.',
          'error'
        );
        console.error('Erreur lors de la modification de l\'étudiant', error);
      },
    });
  }
}
  
closeAddPopup() {
  this.showAddPopup = false;
  this.editMode = false; // Réinitialiser le mode édition
  this.selectedEtudiant = null; // Réinitialiser l'étudiant sélectionné
  this.nouvelEtudiant = {
      description: '',
      categorie: '',
      type: 'PLAINTE',
      statut: '',
   
    };
}
}
