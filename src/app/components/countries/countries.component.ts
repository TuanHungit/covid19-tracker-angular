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
  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe((result) => {
      this.globalData = result;
      result.forEach((el) => {
        this.countryList.push(el.country);
      });
    });
  }
}
