import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from './../models/global-data';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private globalDataUrl =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-13-2021.csv';
  constructor(private http: HttpClient) {}

  getGlobalData(): any {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map((result) => {
        const rows = result.split('\n');
        const raw = {};
        rows.forEach((row) => {
          const cols = row.split(/,(?=\S)/);
          if (
            isNaN(+cols[10]) ||
            isNaN(+cols[7]) ||
            isNaN(+cols[8]) ||
            isNaN(+cols[9])
          ) {
            return;
          }
          const cs: GlobalDataSummary = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };
          const temp: GlobalDataSummary = raw[cs.country];
          if (temp) {
            temp.active += cs.active;
            temp.confirmed += cs.confirmed;
            temp.deaths += cs.active;
            temp.recovered += cs.recovered;
          } else {
            raw[cs.country] = cs;
          }
        });

        return Object.values(raw) as GlobalDataSummary[];
      })
    );
  }
}
