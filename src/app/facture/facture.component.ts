import { Component } from '@angular/core';
import { PeimentService } from '../Services/peiment.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent {
constructor(private paiementService: PeimentService) {
  }
  private id = localStorage.getItem('id');
  payment: any[] = [];
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
}
