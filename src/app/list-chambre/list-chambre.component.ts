import { Component } from '@angular/core';
import { ChambresService } from '../Services/chambres.service';

@Component({
  selector: 'app-list-chambre',
  templateUrl: './list-chambre.component.html',
  styleUrls: ['./list-chambre.component.scss']
})
export class ListChambreComponent {
  chambres: any[] = [];  // Liste des chambres récupérées depuis l'API
  selectedChambre: any = null; // Chambre sélectionnée pour afficher ses étudiants
  showPopup: boolean = false;  // Contrôle l’affichage de la popup
showAddPopup = false;
  newChambre = { libelle: '', capacite: 0, prix: 0, etat: 'libre' };

  constructor(private chambreService: ChambresService) { }

  ngOnInit(): void {
    this.loadChambres();  // Charger les chambres
  }

  loadChambres(): void {
    this.chambreService.getChambres().subscribe((data: any) => {
      this.chambres = data;  // Charger toutes les chambres
    }, error => {
      console.error("Erreur lors du chargement des chambres", error);
    });
  }

  openPopup(chambre: any): void {
    this.selectedChambre = chambre;  // Définir la chambre sélectionnée
    this.showPopup = true;  // Afficher la popup
  }

  closePopup(): void {
    this.showPopup = false;  // Cacher la popup
    this.selectedChambre = null;  // Réinitialiser la chambre sélectionnée
  }

  openAddPopup() {
    this.showAddPopup = true;
}

closeAddPopup() {
    this.showAddPopup = false;
}

addChambre() {
  const chambreData = {
    capacite: this.newChambre.capacite,
    prix: this.newChambre.prix,
    libelle: this.newChambre.libelle,
  };

  this.chambreService.portchambre(chambreData).subscribe({
    next: (response) => {
      console.log('Chambre ajoutée avec succès', response);
      this.chambres.push(response); // Ajouter la chambre à la liste
      this.closeAddPopup();
    },
    error: (error) => {
      console.error('Erreur lors de l\'ajout de la chambre', error);
    },
  });
}

deleteChambre(chambreId: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) {
    this.chambreService.deletechambre(chambreId).subscribe({
      next: () => {
        console.log('Chambre supprimée avec succès');
        // Supprimez localement la chambre de la liste
        this.chambres = this.chambres.filter(chambre => chambre.id !== chambreId);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la chambre', err);
      },
    });
  }
}


}
