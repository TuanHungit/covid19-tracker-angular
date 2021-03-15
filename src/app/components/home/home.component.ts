import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { DataServiceService } from '../../services/data-service.service';
import { GlobalDataSummary } from './../../models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  globalData: GlobalDataSummary[];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };
  constructor(private DataService: DataServiceService) {}

  ngOnInit(): void {
    this.DataService.getGlobalData().subscribe({
      next: (result) => {
        this.globalData = result;
        result.forEach((el: GlobalDataSummary) => {
          this.totalConfirmed += el.confirmed;
          this.totalDeaths += el.deaths;
          this.totalActive += el.active;
          this.totalRecovered += el.recovered;
        });
        this.initChart('c');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  initChart(casetype: string): void {
    const datatable = [];
    datatable.push(['Country', 'Cases']);
    this.globalData.forEach((cs: GlobalDataSummary) => {
      let value: number;
      switch (casetype) {
        case 'a':
          if (cs.active > 2000000) {
            value = cs.active;
          }
          break;
        case 'd':
          if (cs.deaths > 2000000) {
            value = cs.deaths;
          }
          break;
        case 'r':
          if (cs.recovered > 2000000) {
            value = cs.recovered;
          }
          break;
        case 'c':
          if (cs.confirmed > 2000000) {
            value = cs.confirmed;
          }
          break;
      }

      datatable.push([cs.country, value]);
    });

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      options: { height: 500 },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      options: { height: 500 },
    };
  }
  updateChart(input: HTMLInputElement): void {
    this.initChart(input.value);
  }
}
