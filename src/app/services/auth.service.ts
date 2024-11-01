import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable ,of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { MarcajeService } from './marcaje.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private tokenKey = 'auth-token';
  private userRoleSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient,
    private marcajeService: MarcajeService
  ) {}
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password })
    .pipe(map((response:any) => {
      if (response && response.token ) {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem('empleadoId', response.empleadoId.toString());
        console.log(response.empleadoId.toString());
        this.checkRole();
        this.registrarPrimeraEntrada();
      }
      return response;
    }));
  }

  registrarPrimeraEntrada(): void {
    const userId = localStorage.getItem('empleadoId');
    if (userId) {
      this.marcajeService.registrarEntrada(userId).subscribe({
        next: (response) => {
          const idMarcaje = response.idMarcaje;
          localStorage.setItem('sessionId', idMarcaje.toString());
          console.log('Marcaje registrado correctamente. ID:', idMarcaje);
        },
        error: (error) => {
          console.error('Error al registrar entrada:', error);
        }
      });
    }else {
      console.error('No hay usuario logueado.');
    }
  }

  checkRole() {
    const empleadoId = localStorage.getItem('empleadoId');
    
    if (!empleadoId) {
      console.error('No hay empleadoId en localStorage.');
      return; // Salir si no hay empleadoId
    }
    this.http.get(`${this.apiUrl}/api/usuarios/rol/${empleadoId}`).subscribe({
      next: (response) => {
        if (Array.isArray(response) && response.length > 0) {
          const nombreRol = response[0].nombreRol; // Asumimos que siempre habrá al menos un rol
  
          if (nombreRol === 'Admin') {
            this.userRoleSubject.next('admin');
            localStorage.setItem('userRole', 'admin');
            console.log('Usuario es admin');
          } else if (nombreRol === 'Empleado') {
            this.userRoleSubject.next('user');
            localStorage.setItem('userRole', 'user');
            console.log('Usuario es empleado');
          } else {
            console.warn('Rol desconocido:', nombreRol);
          }
        } else {
          console.warn('Respuesta inesperada del servidor:', response);
        }
      },
      error: (err) => {
        console.error('Error al obtener el rol del usuario:', err);
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
