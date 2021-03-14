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
      },
    });
  }
}
