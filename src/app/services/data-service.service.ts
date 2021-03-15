import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from './../models/global-data';
import { DateWiseData } from '../models/date-wise-data';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private globalDataUrl =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-13-2021.csv';
  private dateWiseDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;
  constructor(private http: HttpClient) {}

  getDateWiseData(): any {
    return this.http.get(this.dateWiseDataUrl, { responseType: 'text' }).pipe(
      map((result) => {
        const rows = result.split('\n');
        const mainData = {};
        const header = rows[0];
        const dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);
        rows.splice(0, 1);
        rows.forEach((row) => {
          const cols = row.split(/,(?=\S)/);
          const con = cols[1];
          cols.splice(0, 4);
          mainData[con] = [];
          cols.forEach((value, index) => {
            const dw: DateWiseData = {
              cases: +value,
              country: con,
              date: new Date(Date.parse(dates[index])),
            };
            mainData[con].push(dw);
          });
        });
        return mainData;
      })
    );
  }
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
