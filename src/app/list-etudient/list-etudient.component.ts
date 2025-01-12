import { Component } from '@angular/core';
import { Etudiant, EtudiantsService } from '../Services/etudiants.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-etudient',
  templateUrl: './list-etudient.component.html',
  styleUrls: ['./list-etudient.component.scss']
})
export class ListEtudientComponent {
  etudiants: Etudiant[] = [];
   showDetailPopup = false;
  isAffecter = false;
  chambreForm: FormGroup;
  chambres: any[] = []; // Liste des chambres récupérées
  selectedChambreId: number =0 // ID de la chambre sélectionnée


   filteredEtudiants: Etudiant[] = [];
  searchTerm: string = '';
  editMode = false;
  selectedEtudiant: any = null;
    showPopup: boolean = false;  // Contrôle l’affichage de la popup
showAddPopup = false;
  loading = true;
   nouvelEtudiant = {
    nom: '',
    prenom: '',
    dateNaissance: '',
    matricule: '',
    filiere: '',
    sexe: 'M',
    email: '',
    motDePasse: '',
  };

  constructor(private etudiantService: EtudiantsService,private fb: FormBuilder) {
     this.chambreForm = this.fb.group({
      chambreId: [''] // Contrôle du formulaire pour l'ID
    });
  }

ngOnInit(): void {
  this.checkTokenInLocalStorage()
 this.etudiantService.getEtudiants().subscribe(
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

getEtudiant (){
 this.etudiantService.getEtudiants().subscribe(
    (data) => {
      this.etudiants = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération des étudiants', error);
      this.loading = false;
    }
  );
}

  checkTokenInLocalStorage(): boolean {
  const token = localStorage.getItem('access_token'); // Remplacez 'authToken' par la clé utilisée pour stocker le token.
  return !!token; // Retourne true si le token existe, sinon false.
}


 closeDetailPopup(): void {
    this.showDetailPopup = false;
    this.selectedEtudiant = null;
  }

openDetailPopup(etudiant: Etudiant): void {
  console.log("oppned")
  this.showDetailPopup = true;
  this.selectedEtudiant = etudiant;
  this.isAffecter = etudiant.chambre?.id !== null;
  
  // Récupération des chambres
  this.etudiantService.getChambreLib().subscribe(
    (data) => {
      this.chambres = data;
      console.log(this.chambres)
    },
    (error) => {
      console.error('Erreur lors de la récupération des chambres', error);
    }
  );
  

  
}

// affecterChambre(): void {
  
//   if (this.selectedEtudiant) {
//     console.log(this.selectedEtudiant)
//     this.etudiantService.affecterChambre(this.selectedEtudiant.id, this.selectedChambreId).subscribe(
//       () => {
//         Swal.fire('Succès', 'Chambre affectée avec succès', 'success');
//         //this.selectedEtudiant.chambre = this.chambres.find(chambre => chambre.id === chambreId); // Mise à jour locale
//         this.isAffecter = true;
//         this.getEtudiant();
//         this.closeDetailPopup()
        
//       },
//       (error) => {
//         Swal.fire('Erreur', 'Erreur lors de l\'affectation', 'error');
//       }
//     );
//   }
  
// }

affecterChambre(): void {
  if (this.selectedEtudiant) {
    console.log(this.selectedEtudiant)
    this.etudiantService.affecterChambre(this.selectedEtudiant.id, this.selectedChambreId).subscribe(
      (response) => {
        Swal.fire('Succès', 'Chambre affectée avec succès', 'success');
        
        // Mise à jour locale après affectation
        this.selectedEtudiant.chambre = this.chambres.find(chambre => chambre.id === this.selectedChambreId); // Mise à jour de la chambre de l'étudiant
        this.isAffecter = true;

        // Mise à jour de la liste des étudiants (si nécessaire)
        const index = this.etudiants.findIndex(e => e.id === this.selectedEtudiant.id);
        if (index !== -1) {
          this.etudiants[index] = this.selectedEtudiant; // Mettre à jour l'étudiant dans la liste
          this.filteredEtudiants[index] = this.selectedEtudiant;  // Mettre à jour filteredEtudiants
        }

        this.closeDetailPopup();
      },
      (error) => {
        Swal.fire('Erreur', 'Erreur lors de l\'affectation', 'error');
      }
    );
  }
}

  openAddPopup() {
    console.log ('add')
    this.showAddPopup = true;
}
closePopup(): void {
  this.showDetailPopup = false;
  this.selectedEtudiant = null;
  this.chambreForm.reset(); // Réinitialiser le formulaire
}

openEditPopup(etudiant: Etudiant) {
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

    this.etudiantService.updateEtudiant(this.selectedEtudiant.id, updatedData).subscribe({
      next: (response) => {
        Swal.fire(
          'Succès!',
          'L\'étudiant a été modifié avec succès.',
          'success'
        );
        // Mettre à jour la liste localement
        // Mettre à jour la liste localement
        const index = this.etudiants.findIndex((e) => e.id === this.selectedEtudiant.id);
        if (index !== -1) {
          this.etudiants[index] = response;
          this.filteredEtudiants[index] = response;  // Mettre à jour filteredEtudiants
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


addEtudiant() {
  if (this.editMode) {
    this.updateEtudiant(); // Appeler la méthode d'édition
  } else {
    const etudiantData = {
      email: this.nouvelEtudiant.email,
      filiere: this.nouvelEtudiant.filiere,
      dateNaissance: this.nouvelEtudiant.dateNaissance,
      nom: this.nouvelEtudiant.nom,
      prenom: this.nouvelEtudiant.prenom,
      matricule: this.nouvelEtudiant.matricule,
      sexe: this.nouvelEtudiant.sexe,
      motDePasse: this.nouvelEtudiant.motDePasse,
    };

    this.etudiantService.portEtud(etudiantData).subscribe({
      next: (response) => {
        Swal.fire(
          'Succès!',
          'L\'étudiant a été ajouté avec succès.',
          'success'
        );
        this.etudiants.push(response);
        this.etudiants.push(response);
        this.filteredEtudiants.push(response); // Mettre à jour filteredEtudiants
        this.closeAddPopup();
      },
      error: (error) => {
        Swal.fire(
          'Erreur!',
          'Il y a eu une erreur lors de l\'ajout de l\'étudiant.',
          'error'
        );
        console.error('Erreur lors de l\'ajout de l\'étudiant', error);
      },
    });
  }
}

closeAddPopup() {
  this.showAddPopup = false;
  this.editMode = false; // Réinitialiser le mode édition
  this.selectedEtudiant = null; // Réinitialiser l'étudiant sélectionné
  this.nouvelEtudiant = {
    nom: '',
    prenom: '',
    dateNaissance: '',
    matricule: '',
    filiere: '',
    sexe: 'M',
    email: '',
    motDePasse: '',
  };
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
      this.etudiantService.deleteEtudiant(etudiantId).subscribe({
        next: () => {
          Swal.fire(
            'Supprimé!',
            'L\'étudiant a été supprimé avec succès.',
            'success'
          );
          // Supprimer localement l'étudiant de la liste
          this.etudiants = this.etudiants.filter(etudiant => etudiant.id !== etudiantId);
          this.filteredEtudiants = this.filteredEtudiants.filter(etudiant => etudiant.id !== etudiantId); // Mettre à jour filteredEtudiants
        },
        error: (err) => {
          Swal.fire(
            'Erreur!',
            'Il y a eu une erreur lors de la suppression.',
            'error'
          );
          console.error('Erreur lors de la suppression de l\'étudiant ', err);
        },
      });
    }
  });
}


//  libererChambre(): void {

//     if (this.selectedEtudiant) {
//       this.etudiantService.libererChambre(this.selectedEtudiant.id,this.selectedEtudiant.chambre.id).subscribe(
//         () => {
//           Swal.fire('Succès', 'Chambre libérée avec succès', 'success');
//           this.closeDetailPopup();
//           this.updateEtudiant(); // Mise à jour de l'étudiant dans la liste
//         },
//         (error) => {
//           Swal.fire('Erreur', 'Erreur lors de la libération de la chambre', 'error');
//         }
//       );
//     }

//   }
// Method to filter students based on the search term

libererChambre2(): void {
  if (this.selectedEtudiant) {
    this.etudiantService.libererChambre(this.selectedEtudiant.id, this.selectedEtudiant.chambre.id).subscribe(
      () => {
        Swal.fire('Succès', 'Chambre libérée avec succès', 'success');
        this.closeDetailPopup();
        


        
      },
      (error) => {
        Swal.fire('Erreur', 'Erreur lors de la libération de la chambre', 'error');
      }
    );
  }
}

// libererChambre(): void {
//   if (this.selectedEtudiant) {
//     console.log(this.selectedEtudiant)
//     this.etudiantService.libererChambre(this.selectedEtudiant.id, this.selectedChambreId).subscribe(
//       (response) => {
//         Swal.fire('Succès', 'Chambre libérée avec succès', 'success');
        
//         // Mise à jour locale après affectation
//         this.selectedEtudiant.chambre = this.chambres.find(chambre => chambre.id === this.selectedChambreId); // Mise à jour de la chambre de l'étudiant
//         this.isAffecter = true;

//         // Mise à jour de la liste des étudiants (si nécessaire)
//         const index = this.etudiants.findIndex(e => e.id === this.selectedEtudiant.id);
//         if (index !== -1) {
//           this.etudiants[index] = this.selectedEtudiant; // Mettre à jour l'étudiant dans la liste
//           this.filteredEtudiants[index] = this.selectedEtudiant;  // Mettre à jour filteredEtudiants
//         }

//         this.closeDetailPopup();
//       },
//       (error) => {
//         Swal.fire('Erreur', 'Erreur lors de liberation', 'error');
//       }
//     );
//   }
// }

// libererChambre(): void {
//   if (this.selectedEtudiant) {
//     this.etudiantService.libererChambre(this.selectedEtudiant.id, this.selectedEtudiant.chambre.id).subscribe(
//       () => {
//         Swal.fire('Succès', 'Chambre libérée avec succès', 'success');
//         this.closeDetailPopup();

//         // Mise à jour locale après libération
//         this.selectedEtudiant.chambre = null;  // Chambre libérée (null)

//         // Mise à jour de la liste des étudiants (si nécessaire)
//         const index = this.etudiants.findIndex(e => e.id === this.selectedEtudiant.id);
//         if (index !== -1) {
//           this.etudiants[index] = this.selectedEtudiant; // Mettre à jour l'étudiant dans la liste
//           this.filteredEtudiants[index] = this.selectedEtudiant;  // Mettre à jour filteredEtudiants
//         }

//         // Vous pouvez directement appeler une méthode pour filtrer à nouveau les étudiants si nécessaire
//         this.filterEtudiants();  // Refiltrer les étudiants pour appliquer les changements

//       },
//       (error) => {
//         Swal.fire('Erreur', 'Erreur lors de la libération de la chambre', 'error');
//       }
//     );
//   }
// }

libererChambre(): void {
  if (this.selectedEtudiant) {
    console.log(this.selectedEtudiant);
    this.etudiantService.libererChambre(this.selectedEtudiant.id, this.selectedChambreId).subscribe(
      (response) => {
        Swal.fire('Succès', 'Chambre libérée avec succès', 'success');
        
        // Mise à jour locale après libération de la chambre
        this.selectedEtudiant.chambre = { id: null, libelle: 'Non spécifié' };  // Remettre la chambre à "Non spécifié"
        this.isAffecter = false;

        // Mise à jour de la liste des étudiants (si nécessaire)
        const index = this.etudiants.findIndex(e => e.id === this.selectedEtudiant.id);
        if (index !== -1) {
          this.etudiants[index] = this.selectedEtudiant; // Mettre à jour l'étudiant dans la liste
          this.filteredEtudiants[index] = this.selectedEtudiant;  // Mettre à jour filteredEtudiants
        }

        // Si nécessaire, appeler une méthode de filtrage ou de mise à jour de l'affichage
        this.filterEtudiants();  // Par exemple, pour appliquer les changements dans filteredEtudiants

        this.closeDetailPopup();
      },
      (error) => {
        Swal.fire('Erreur', 'Erreur lors de la libération', 'error');
      }
    );
  }
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
      (etudiant.nom && etudiant.nom.toLowerCase().includes(searchTermLower)) ||
      (etudiant.matricule && etudiant.matricule.toLowerCase().includes(searchTermLower)) ||
      (etudiant.filiere && etudiant.filiere.toLowerCase().includes(searchTermLower))
    );
  }
  console.log('Etudiants filtrés:', this.filteredEtudiants);  // Vérifier que le filtrage fonctionne
}

// filterEtudiants() {
//     console.log('Recherche en cours pour:', this.searchTerm);
//      this.etudiantService.searchEtudiants(this.searchTerm,this.searchTerm,this.searchTerm)
//     .subscribe(
//       (data) => {
//         this.filteredEtudiants = data;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des étudiants :', error);
//       }
//     );
//   }



}
