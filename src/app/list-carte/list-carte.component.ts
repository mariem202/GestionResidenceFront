import { Component } from '@angular/core';
import { CarteService } from '../Services/carte.service';

@Component({
  selector: 'app-list-carte',
  templateUrl: './list-carte.component.html',
  styleUrls: ['./list-carte.component.scss']
})
export class ListCarteComponent {
  numeroPart1: string = '';
  numeroPart2: string = '';
  numeroPart3: string = '';
  numeroPart4: string = '';
  numeroCarte: string = '';

  monthExpiration: string = '';
  yearExpiration: string = '';
  dateExpiration: string | null = null;

  montant: number = 0;
  nomCarte: string = 'edinard';
  cartId: number | null = null; // ID de la carte

  isDisabled: boolean = false; // Flag to disable/enable fields
  isEditing: boolean = false; // Flag to check if the form is in editing mode

  constructor(private carteService: CarteService) {}

  submitForm() {
    // Combine les parties du numéro de carte
    this.numeroCarte = `${this.numeroPart1}${this.numeroPart2}${this.numeroPart3}${this.numeroPart4}`;

    // Convertir la date d'expiration au format 'yyyy-MM-dd'
    if (this.monthExpiration && this.yearExpiration) {
      this.dateExpiration = `${this.yearExpiration}-${this.monthExpiration.padStart(2, '0')}-01`;  // Format sans heure
    } else {
      this.dateExpiration = null;
    }

    const formData = {
      numeroCarte: this.numeroCarte,
      nomCarte: this.nomCarte,
      montant: this.montant,
      dateExpiration: this.dateExpiration
    };

    this.carteService.portcard(formData).subscribe({
      next: (response) => {
        console.log('Carte ajoutée avec succès', response);
        this.cartId = response.id;
        this.isDisabled = true;
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la carte', error);
      }
    });
  }

  toggleEdit() {
  if (this.isEditing) {
    // Si nous sommes en mode édition, procéder à la mise à jour de la carte
    this.updateCard();
  } else {
    // Si nous ne sommes pas en mode édition, activer les champs pour édition
    this.isDisabled = false;  // Désactiver les champs pour édition
  }
  this.isEditing = !this.isEditing;  // Inverser l'état d'édition
}


  deleteCard() {
    if (this.cartId) {
      this.carteService.deleteCart(this.cartId).subscribe({
        next: () => {
          console.log('Carte supprimée avec succès');
          this.clearForm(); // Réinitialiser les champs après suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la carte', error);
        }
      });
    }
  }

  updateCard() {
    if (this.cartId) {
      const updatedCart: any = {
        numeroCarte: this.numeroCarte,
        nomCarte: this.nomCarte,
        montant: this.montant,
        dateExpiration: this.dateExpiration,
        // Ajoutez d'autres propriétés que vous souhaitez mettre à jour
      };

      this.carteService.updateCart(this.cartId, updatedCart).subscribe({
        next: (updated) => {
          console.log('Carte mise à jour', updated);
          this.isDisabled = true;  // Désactiver les champs après la mise à jour
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la carte', error);
        }
      });
    }
  }

  clearForm() {
    this.numeroPart1 = '';
    this.numeroPart2 = '';
    this.numeroPart3 = '';
    this.numeroPart4 = '';
    this.numeroCarte = '';
    this.monthExpiration = '';
    this.yearExpiration = '';
    this.dateExpiration = null;
    this.montant = 0;
    this.isDisabled = true; // Activer les champs après suppression
    this.cartId = null; // Réinitialiser l'ID de la carte
    this.isEditing = false; // Réinitialiser l'état d'édition
  }
}
