import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { GlobalDataSummary } from './../../models/global-data';

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
  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    // this.dataService.getDateWiseData().subscribe((result) => {
    //   console.log(result);
    // });

    this.dataService.getGlobalData().subscribe((result) => {
      this.globalData = result;
      result.forEach((el) => {
        this.countryList.push(el.country);
      });
      this.updateValues(this.countryList[0]);
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
  }
}
