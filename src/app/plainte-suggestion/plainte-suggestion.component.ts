import { Component } from '@angular/core';
import { PleinteService } from '../Services/pleinte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plainte-suggestion',
  templateUrl: './plainte-suggestion.component.html',
  styleUrls: ['./plainte-suggestion.component.scss']
})
export class PlainteSuggestionComponent {
 plaintes: any[] = [];
    nouvelEtudiant = {
    description: '',
    categorie: '',
    type: 'PLAINTE',
    statut: '',
 
  };


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
    addSUGGESTION() {
     
        const etudiantData = {
          description: this.nouvelEtudiant.description,
          categorie: this.nouvelEtudiant.categorie,
          type: this.nouvelEtudiant.type,
          statut: "EN_ATTENTE",
        };
        console.log(etudiantData)
    
        this.PleinteService.postplaintes(etudiantData).subscribe({
          next: (response) => {
            Swal.fire(
              'Succès!',
              'L\'pleinte a été ajouté avec succès.',
              'success'
            );
            this.plaintes.push(response);
           
          },
          error: (error) => {
            Swal.fire(
              'Erreur!',
              'Il y a eu une erreur lors de l\'ajout de pleinte ',
              'error'
            );
            console.error('Erreur lors de l\'ajout de pleinte ', error);
          },
        });
      

    }

    deleteEtudiant(etudiantId: number): void {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.PleinteService.deleteplaintes(etudiantId).subscribe({
            next: () => {
              Swal.fire(
                'Supprimé!',
                'pleinte a été supprimé avec succès.',
                'success'
              );
              // Supprimer localement l'étudiant de la liste
              this.plaintes = this.plaintes.filter(etudiant => etudiant.id !== etudiantId);
            },
            error: (err) => {
              Swal.fire(
                'Erreur!',
                'Il y a eu une erreur lors de la suppression.',
                'error'
              );
              console.error('Erreur lors de la suppression de plaintes ', err);
            },
          });
        }
      });
    }
}
