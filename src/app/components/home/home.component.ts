import { Component, OnInit } from '@angular/core';
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
  dataTable = [];
  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
    },
  };
  globalData: GlobalDataSummary[];

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

  initChart(caseType: string): any {
    this.dataTable = [];
    // this.datatable.push(["Country", "Cases"])
    this.globalData.forEach((cs) => {
      let value: number;
      if (caseType === 'c') {
        if (cs.confirmed > 2000000) {
          value = cs.confirmed;
        }
      }
      if (caseType === 'd') {
        if (cs.deaths > 20000) {
          value = cs.deaths;
        }
      }
      if (caseType === 'a') {
        if (cs.active > 20000) {
          value = cs.active;
        }
      }
      if (caseType === 'r') {
        if (cs.recovered > 2000000) {
          value = cs.recovered;
        }
      }

      this.dataTable.push([cs.country, value]);
    });
  }

  updateChart(input: HTMLInputElement): void {
    this.initChart(input.value);
  }
}
