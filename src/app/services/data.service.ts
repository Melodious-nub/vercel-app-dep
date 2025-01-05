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

  getAllEmployee() {
    return this.http.get<any>(this.apiUrl + '/api/employee/all-employee');
  }

  getAllDepartments() {
    return this.http.get<any>(this.apiUrl + '/api/department-designation/departments');
  }

  getDesignationByDepartment(deptId: any) {
    return this.http.get<any>(this.apiUrl + '/api/department-designation/designations-by-department' + '?departmentId=' + deptId);
  }

  getAllSettingDetails(deptId: any, desigId: any) {
    return this.http.get<any>(this.apiUrl + '/api/department-designation/all-details' + '?departmentId=' + deptId + '&designationId=' + desigId);
  }

  createEmployee(data: any) {
    return this.http.post<any>(this.apiUrl + '/api/employee/create', data);
  }

  getEmployeeDetails(id: any) {
    return this.http.get<any>(this.apiUrl + '/api/employee?employeeId=' + id);
  }

  getEmployeeImage(id: any) {
    return this.http.get<any>(this.apiUrl + '/api/employee/image?employeeId=' + id);
  }

  saveEmployeePersonal(data: any) {
    return this.http.put<any>(this.apiUrl + '/api/employee/create-or-update-personal', data);
  }

  getAllocatedAssedOfEmp(employeeId: any) {
    return this.http.get<any>(this.apiUrl + '/get-allocated-asset-by-employee' + '?employeeId=' + employeeId);
  }

  getAllAssetName() {
    return this.http.get<any>(this.apiUrl + '/all');
  }

  getPersonalData(employeeId: any) {
    return this.http.get<any>(this.apiUrl + '/api/employee/personal-info' + '?employeeId=' + employeeId);
  }

  allocateAsset(data: any) {
    return this.http.post<any>(this.apiUrl + '/allocate', data);
  }

  returnAsset(allocationId: any, data: any) {
    return this.http.post<any>(
      `${this.apiUrl}/return/${allocationId}`,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text' as 'json', // Specify that the response should be treated as plain text
      }
    );
  }

  addNotes(data: any) {
    return this.http.post<any>(this.apiUrl + '/api/employee/create-note', data)
  }

  addDocument(data: any) {
    return this.http.post<any>(this.apiUrl + '/api/employee/create-document', data);
  }

  updateEmployeeDetails(data: any) {
    return this.http.put<any>(this.apiUrl + '/api/employee/update', data);
  }

}
