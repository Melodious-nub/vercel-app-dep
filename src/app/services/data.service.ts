import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://103.73.224.6:8020';

  constructor(private http: HttpClient) { }

  resgister(data: any) {
    return this.http.post<any>(this.apiUrl + '/api/public/register', data);
  }

  getAllCountries() {
    return this.http.get<any>(this.apiUrl + '/api/public/countries');
  }

  getAllEmployeeRange() {
    return this.http.get<any>(this.apiUrl + '/api/public/employee-range');
  }

  // prvious works
  createEmployee(data: any) {
    return this.http.post<any>('/api/employees', data);
  }

  getAllEmployee() {
    return this.http.get<any>('/api/employees');
  }

  createdEmployeeAcoountSetting(data: any, id: any) {
    return this.http.post<any>('/api/employee/' + id + '/employee-settings', data);
  }

  updateEmpDetails(data: any, id: any) {
    return this.http.post<any>('/api/employee/' + id + '/employee-details', data);
  }
}
