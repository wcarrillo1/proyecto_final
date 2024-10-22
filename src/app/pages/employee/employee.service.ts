import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Employee } from './employee.model';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService  {
  // private baseUrl  = `${environment.apiUrl}/api`;
  private baseUrl  = `/api`;
  private empleados: any[] = [];
  constructor(private http: HttpClient) {}

  // getEmpleados(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/empleados`).pipe(
  //     tap((data) => console.log('Datos de empleados:', data)) 
  //   );
  // }

  // getEmployeeById(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/empleados/${id}`);
  // }

  // addEmployee(employee: any): Observable<HttpResponse<any>> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<any>(`${this.baseUrl}/createEmployee`, employee, { headers, observe: 'response' });
  // }

  // updateEmployee(id: number, employeeData: Partial<Employee>): Observable<void> {
  //   return this.http.put<void>(`${this.baseUrl}/empleados/${id}`, employeeData);
  // }

  // updateEmployeeStatus(id: number, status: number): Observable<void> {
  //   return this.http.put<void>(`${this.baseUrl}/empleados/estado/${id}/${status}`, {});
  // }

  getEmpleados(): any[] {
    return this.empleados;
  }

  addEmpleado(employee: any): void {
    this.empleados.push(employee);
  }
}