import { Component } from '@angular/core';
import { Contact, contacts } from '../dashboard/dashboard-components/contacts/contact-data';
import { PleinteService } from '../Services/pleinte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-plainte-suggestion',
  templateUrl: './add-plainte-suggestion.component.html',
  styleUrls: ['./add-plainte-suggestion.component.scss']
})
export class AddPlainteSuggestionComponent {
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
 this.PleinteService.getplaintesByEtud().subscribe(
    (data) => {
      this.plaintes = data;
      console.log('p',this.plaintes)
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

}
