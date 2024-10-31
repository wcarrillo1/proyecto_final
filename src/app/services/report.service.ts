import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = environment.apiReports;

  constructor(private http: HttpClient) {}

  downloadReport(endpoint: string): Observable<Blob> {
    const url = `${this.apiUrl}${endpoint}`;
    console.log('Download Report URL:', url);
    return this.http.get(`${this.apiUrl}${endpoint}`, {
      responseType: 'blob'
    });
  }

  getReportPreview(endpoint: string): Observable<Blob> {
    const url = `${this.apiUrl}${endpoint}`;
    console.log('Preview Report URL:', url);
    return this.http.get(`${this.apiUrl}${endpoint}`, {
      responseType: 'blob' 
    });
  }

  getDepartmentReport(requestBody: any, download: boolean) {
    const url = `${this.apiUrl}/reportes/departamento`; // URL del endpoint
    console.log('Preview Report URL:', url, requestBody);
    return this.http.post(url, requestBody, { responseType: 'blob' }); // Enviar el cuerpo como JSON
  }

  downloadDepartmentReport(requestBody: any) {
    const url = `${this.apiUrl}/reportes/departamento?descarga=true`; // Agregar parámetro para descargar
    console.log('Preview Report URL:', url, requestBody);
    return this.http.post(url, requestBody, { responseType: 'blob' }); // Enviar el cuerpo como JSON
  }

//   getIndividualReport(requestBody: any, download: boolean): Observable<Blob> {
//     const url = `${this.apiUrl}/reportes/individual`;
//     console.log('Preview Report URL:', url, requestBody);
//     return this.http.post(url, requestBody, { responseType: 'blob' });
// }

downloadIndividualReport(requestBody: { usuarioId: number }) {
  const url = `${this.apiUrl}/reportes/individual?descarga=true`;
  console.log('Preview Report URL:', url, requestBody);
  return this.http.post(url, requestBody,{ responseType: 'blob' });
}

// Función para obtener la vista previa del reporte de marcaje de empleado
getIndividualReport(requestBody: any, download: boolean) {
  const url = `${this.apiUrl}/reportes/individual`;
  console.log('Preview Report URL:', url, requestBody);
  return this.http.post(url, requestBody, { responseType: 'blob' });
}
}