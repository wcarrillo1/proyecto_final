import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Employee } from './employee.model';
import { environment } from 'environments/environment';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService  {
  private baseUrl  = `${environment.apiUrl}/api`;
  private empleados: Employee[] = [];

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<Employee[]> { // Cambiar el retorno a Observable<Employee[]>
    return this.http.get<Employee[]>(`${this.baseUrl}/usuarios`).pipe(
      tap((data) => {
        this.empleados = data; // Almacenar los empleados en la variable
        console.log('Datos de empleados:', data);
      })
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/usuarios/${id}`);
  }

  addEmpleado(newEmployee: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuarios/nuevo`, newEmployee);
  }

  updateEmployee(url: string, employee: any): Observable<any> { // Cambiar a tipo 'any'
    console.log('URL de actualización:', url);
    console.log('JSON enviado:', JSON.stringify(employee, null, 2));
    return this.http.put(url, employee);
  }

  updateEmployeeStatus(id: number, status: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/empleados/estado/${id}/${status}`, {});
  }

}