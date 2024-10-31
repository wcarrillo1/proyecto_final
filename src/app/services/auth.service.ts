import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable ,of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private tokenKey = 'auth-token';
  private userRoleSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}
  
  login(username: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, contrasena })
    .pipe(map((response:any) => {
      if (response && response.token ) {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem('empleadoId', response.empleadoId.toString());
        console.log(response.empleadoId.toString());
        this.checkRole();
      }
      return response;
    }));
  }

  checkRole() {
    this.http.get(`${this.apiUrl}/modoAdmin`, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.userRoleSubject.next('admin');
        localStorage.setItem('userRole', 'admin');
        console.log('usuario es admin');
      },
      error: (err) => {
        console.error('Error en /modoAdmin:', err);
        if (err.status === 403) {
          this.http.get(`${this.apiUrl}/modoUser`, { responseType: 'text' }).subscribe({
            next: (response) => {
              this.userRoleSubject.next('user');
              localStorage.setItem('userRole', 'user');
            },
            error: () => {
              console.error('Error al obtener el rol del usuario');
            }
          });
        }
      }
    });
  }

  getUserRole(): Observable<string> {
    return this.userRoleSubject.asObservable(); 
  }
  
  logout(): void {
    // limpiar localStorage
    localStorage.clear();
    this.userRoleSubject.next('');
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
