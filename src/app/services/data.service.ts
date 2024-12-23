import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  createEmployee(data:any) {
    return this.http.post<any>('/api/employees', data);
  }

  getAllEmployee() {
    return this.http.get<any>('/api/employees');
  }

  createdEmployeeAcoountSetting(data:any, id:any) {
    return this.http.post<any>('/api/employee/'+id+'/employee-settings', data);
  }

  updateEmpDetails(data:any, id:any) {
    return this.http.post<any>('/api/employee/'+id+'/employee-details', data);
  }
}
