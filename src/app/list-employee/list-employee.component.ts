import { Component } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent {
  etudiants: any[] = [];
   showDetailPopup = false;
   editMode = false;
   selectedEtudiant: any = null;
   showPopup: boolean = false;  // Contrôle l’affichage de la popup
showAddPopup = false;
  loading = true;
   nouvelEtudiant = {
    nom: '',
    prenom: '',
    role: 'AGENT_MAINTENANCE',
    numeroTelephone: '',
    numCnss: '',
    email: '',
    motDePasse: '',
  };

  constructor(private etudiantService: EmployeeService) {
   
  }

ngOnInit(): void {
 this.etudiantService.getEmployees().subscribe(
    (data) => {
      this.etudiants = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération des étudiants', error);
      this.loading = false;
    }
  );
}

getEtudiant (){
 this.etudiantService.getEmployees().subscribe(
    (data) => {
      this.etudiants = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération des étudiants', error);
      this.loading = false;
    }
  );
}

  
 closeDetailPopup(): void {
    this.showDetailPopup = false;
    this.selectedEtudiant = null;
  }

  openAddPopup() {
    console.log ('add')
    this.showAddPopup = true;
}
closePopup(): void {
  this.showDetailPopup = false;
  this.selectedEtudiant = null;
  //this.chambreForm.reset(); // Réinitialiser le formulaire
}


openEditPopup(etudiant: any) {
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

    this.etudiantService.updateEmployee(this.selectedEtudiant.id, updatedData).subscribe({
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
      role: this.nouvelEtudiant.role,
      numeroTelephone: this.nouvelEtudiant.numeroTelephone,
      nom: this.nouvelEtudiant.nom,
      prenom: this.nouvelEtudiant.prenom,
      numCnss: this.nouvelEtudiant.numCnss,
      motDePasse: this.nouvelEtudiant.motDePasse,
    };
    console.log(etudiantData)

    this.etudiantService.portEmployee(etudiantData).subscribe({
      next: (response) => {
        Swal.fire(
          'Succès!',
          'L\'étudiant a été ajouté avec succès.',
          'success'
        );
        this.etudiants.push(response);
        this.etudiants.push(response);
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
    role: '',
    numeroTelephone: '',
    numCnss: '',
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
      this.etudiantService.deleteEmployee(etudiantId).subscribe({
        next: () => {
          Swal.fire(
            'Supprimé!',
            'L\'étudiant a été supprimé avec succès.',
            'success'
          );
          // Supprimer localement l'étudiant de la liste
          this.etudiants = this.etudiants.filter(etudiant => etudiant.id !== etudiantId);
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

}
