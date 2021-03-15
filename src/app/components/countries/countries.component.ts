import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { GlobalDataSummary } from './../../models/global-data';
import { DateWiseData } from './../../models/date-wise-data';

import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  globalData: GlobalDataSummary[] = [];
  countryList: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  dateWiseData;
  loading = true;
  selectedCountryData: DateWiseData[];
  chart = {
    LineChart: 'LineChart',
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
    },
  };
  dataTable = [];
  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    merge(
      this.dataService.getDateWiseData().pipe(
        map((result) => {
          this.dateWiseData = result;
        })
      ),
      this.dataService.getGlobalData().pipe(
        map((result) => {
          this.globalData = result as GlobalDataSummary[];
          this.globalData.forEach((cs) => {
            this.countryList.push(cs.country);
          });
        })
      )
    ).subscribe({
      complete: () => {
        this.updateValues('Vietnam');
        this.loading = false;
      },
    });
  }
  updateValues(country: string): void {
    this.globalData.forEach((cs) => {
      if (cs.country === country) {
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
      }
    });

    this.selectedCountryData = this.dateWiseData[country];
    this.updateChart();
  }
  updateChart(): any {
    this.dataTable = [];
    this.selectedCountryData.forEach((el) => {
      this.dataTable.push([el.date, el.cases]);
    });
  }
}
