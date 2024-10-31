import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marcaje } from '@pages/time-tracking/marcaje.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcajeService {

  private apiUrl = environment.apiTracking;//'http://3.145.108.23:8080/proyecto-final/api/marcajes'

  constructor(private http : HttpClient) { }

  registrarEntrada(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/entrada/${username}`, {}, { headers });
  }

  registrarSalida(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/salida/${username}`, {}, { headers });
  }

  obtenerHistorial(username: string): Observable<Marcaje[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Marcaje[]>(`${this.apiUrl}/historial/${username}`, {headers});
  }

  obtenerUltimoMarcaje(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${this.apiUrl}/ultimo/${username}`, {headers});
  }

  obtenerMarcajesPaginados(page:number, size: number):Observable<any>{
    const url = `${this.apiUrl}/paginados`
    // let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(url)
  }
}