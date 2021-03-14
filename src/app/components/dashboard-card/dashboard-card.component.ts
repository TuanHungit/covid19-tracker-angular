import { Component, OnInit, Input } from '@angular/core';
import { numberWithCommas } from '../../utils/numberWithComma';
@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('totalConfirmed')
  totalConfirmed;
  // tslint:disable-next-line:no-input-rename
  @Input('totalDeaths')
  totalDeaths;
  // tslint:disable-next-line:no-input-rename
  @Input('totalActive')
  totalActive;
  // tslint:disable-next-line:no-input-rename
  @Input('totalRecovered')
  totalRecovered;

  constructor() {}

  ngOnInit(): void {}
  numberWithComma(num: number): string {
    return numberWithCommas(num);
  }
}
