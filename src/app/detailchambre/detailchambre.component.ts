import { Component } from '@angular/core';
import { ProfileComponent } from '../dashboard/dashboard-components/profile/profile.component';
import { PeimentService } from '../Services/peiment.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailchambre',
  templateUrl: './detailchambre.component.html',
  styleUrls: ['./detailchambre.component.scss'],
  standalone: true,
    imports: [ProfileComponent, CommonModule],
})
export class DetailchambreComponent {

  private email = localStorage.getItem('Email');
  private id = localStorage.getItem('id');
  payment: any[] = [];

constructor(private paiementService: PeimentService, private router: Router) {
  }

  ngOnInit(): void {
 this.paiementService.getPaymentinfo(this.id).subscribe(
    (data) => {
      this.payment = data;
      console.log('pqie',this.payment)
    },
    (error) => {
      console.error('Erreur lors de la récupération des étudiants', error);
      
    }
  );
}

effectuerPaiement() {
  this.paiementService.effectuerPaiement(this.id).subscribe({
    next: (response) => {
      console.log('Paiement effectué avec succès :', response);
      // Affiche le message de succès avec la réponse dans le Swal
      Swal.fire('Succès', `Paiement effectué avec succès. Réponse : ${response}`, 'success');
    },
    error: (error) => {
      console.error('Erreur lors du paiement :', error);
      // Affiche le message d'erreur avec les détails de l'erreur dans le Swal
      Swal.fire('Erreur', `Erreur lors du paiement : ${error.error || error}`, 'error');
    }
  });
}

ImprimerFact(){
   this.router.navigate(['/facture']);
}



}
