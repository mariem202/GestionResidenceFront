import { Component } from '@angular/core';
import { ChambresService } from 'src/app/Services/chambres.service';
import { PleinteService } from 'src/app/Services/pleinte.service';

@Component({
  selector: 'app-statstotal',
  templateUrl: './statstotal.component.html',
  standalone: true,
  styleUrls: ['./statstotal.component.scss']
})
export class StatstotalComponent {
 stats: any;
 totalPleinte: number = 0;
 totalChambre: number = 0;
 pourcentageResolues :number = 0;
 pourcentageocc :number = 0;
stats2: any;
  constructor(private plainteService: PleinteService , private chambreService: ChambresService) {}

  ngOnInit() {
    this.plainteService.getStatistiquesPlaintes().subscribe(data => {
      this.stats = data;
      this.totalPleinte=this.stats.totalPlaintes;
      this.pourcentageResolues=this.stats.pourcentageResolues;
      
      console.log('stats',this.stats)
    });

    this.chambreService.getStatistiquesChambre().subscribe(data => {
      this.stats2 = data;
      this.totalChambre=this.stats2.totalChambres;
      this.pourcentageocc=this.stats2.pourcentageOccupees;
      
      console.log('stats',this.stats)
    });
  }
}
