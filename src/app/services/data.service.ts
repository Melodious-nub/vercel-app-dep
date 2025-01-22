import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://103.73.224.6:8020';

  constructor(private http: HttpClient) { }

  // auth section
  resgister(data: any) {
    return this.http.post<any>(this.apiUrl + '/api/public/register', data);
  }

  getAllCountries() {
    return this.http.get<any>(this.apiUrl + '/api/public/countries');
  }

  // employee section
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

  // employee details section
  getEmployeeDetails(id: any) {
    return this.http.get<any>(this.apiUrl + '/api/employee?employeeId=' + id);
  }

  getEmployeeImage(id: any) {
    return this.http.get<any>(this.apiUrl + '/api/employee/image?employeeId=' + id);
  }

  updateEmployeeDetails(data: any) {
    return this.http.put<any>(this.apiUrl + '/api/employee/update', data);
  }

  // employee personal section
  saveEmployeePersonal(data: any) {
    return this.http.put<any>(this.apiUrl + '/api/employee/create-or-update-personal', data);
  }

  getPersonalData(employeeId: any) {
    return this.http.get<any>(this.apiUrl + '/api/employee/personal-info' + '?employeeId=' + employeeId);
  }

  // employee asset section
  getAllocatedAssedOfEmp(employeeId: any) {
    return this.http.get<any>(this.apiUrl + '/get-allocated-asset-by-employee' + '?employeeId=' + employeeId);
  }

  getAllAssetName() {
    return this.http.get<any>(this.apiUrl + '/all');
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


  // note section
  addNotes(data: any) {
    return this.http.post<any>(this.apiUrl + '/api/employee/create-note', data)
  }

  getAllNotes(empId: any) {
    return this.http.get<any>(this.apiUrl + '/api/employee/note/all-by-employee?empId=' + empId);
  }

  // document section
  addDocument(data: any) {
    return this.http.post<any>(this.apiUrl + '/api/employee/create-document', data);
  }

  getAllDocuments() {
    return this.http.get<any>(this.apiUrl + '/api/employee/document/all-by-employee');
  }

  createDocuments(data: any) {
    return this.http.post<any>(this.apiUrl + '/api/employee/create-document', data);
  }

  // this is shared employee list for show employees dropdown
  getAllEmployeeList() {
    return this.http.get<any>(`${this.apiUrl}/api/employee/employee-list`);
  }

  // training section
  createTraining(data: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/training/create`, data, {
      responseType: 'text' as 'json' // Explicitly cast the response type to 'json'
    });
  }

  getAllTraining() {
    return this.http.get<any>(`${this.apiUrl}/api/training`);
  }

  getSpecificTrainingDetails(empId: any) {
    return this.http.get<any>(`${this.apiUrl}/api/training/${empId}/details`);
  }

  deleteTraining(trainingId: any) {
    return this.http.delete<any>(`${this.apiUrl}/api/training/delete/${trainingId}`, {
      responseType: 'text' as 'json' // Explicitly cast the response type to 'json'
    })
  }

  // task section
  createTaskAssign(data: any) {
    return this.http.post<any>(`${this.apiUrl}/api/task/assign`, data, {
      responseType: 'text' as 'json' // Explicitly cast the response type to 'json'
    });
  }

  getAllTasks() {
    return this.http.get<any>(`${this.apiUrl}/api/task`);
  }

  // emergency contact section
  createEmergencyContact(data: any) {
    return this.http.post<any>(`${this.apiUrl}/api/emergency-contact`, data);
  }

  getAllEmergencyContact() {
    return this.http.get<any>(`${this.apiUrl}/api/emergency-contact`);
  }

  deleteEmergencyContact(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/api/emergency-contact/${id}`);
  }

  updateEmergencyContact(id: any, data: any) {
    return this.http.put<any>(`${this.apiUrl}/api/emergency-contact/${id}`, data);
  }

}
