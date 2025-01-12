import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexChart,
  ChartComponent,
  ApexTooltip,
  ApexLegend,
  ApexFill,
  NgApexchartsModule,
  ApexNonAxisChartSeries
} from "ng-apexcharts";
import { PeimentService } from "src/app/Services/peiment.service";

export interface ChartOptions {
  series: ApexNonAxisChartSeries; 
  chart: ApexChart;
  labels: string[];
  tooltip: ApexTooltip;
  legend: ApexLegend;
  fill: ApexFill;
}

@Component({
  selector: "app-sales-overview",
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: "./sales-overview.component.html"
})
export class SalesOverviewComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions; // Typage strict ici

  constructor(private paymentService: PeimentService) {
    // Initialisation avec des valeurs par défaut
    this.chartOptions = {
      series: [0, 0, 0], 
      chart: {
        type: "pie",
        height: 320
      },
      labels: ["Payé", "En Retard", "Non Payé"], 
      tooltip: {
        theme: "dark"
      },
      legend: {
        position: "bottom"
      },
      fill: {
        opacity: 1
      }
    };
  }

  ngOnInit(): void {
    this.paymentService.getPaymentStatistics().subscribe((data) => {
      const { paidPercentage, overduePercentage, unpaidPercentage } = data;
      
      // Met à jour les séries et labels
      this.chartOptions.series = [paidPercentage, overduePercentage, unpaidPercentage];
      this.chartOptions.labels = ["Payé", "Non Payé", "En Retard"];
    });
  }
}
