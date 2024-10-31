import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://3.145.108.23:8080/proyecto-final/api/marcajes';

  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<any>{
    const url = `${this.apiUrl}/register`
    return this.http.post<User>(`${url}`, user);
  }

  obtenerUsuariosPaginados(page: number, size: number): Observable<any> {
    const url = `${this.apiUrl}/paginados`
    let params = new HttpParams().set('page', page).set('size', size);
    console.log('parametros:',url,{params});
    return this.http.get<any>(url, { params });
  }

  obtenerUsuario(username: string): Observable<User>{
    const url = `${this.apiUrl}/${username}`;
    return this.http.get<User>(url);
  }

  obtenerUsuarioPorId(usuarioId: number):Observable<User>{
    const url = `${this.apiUrl}/id/${usuarioId}`;
    return this.http.get<User>(url);
  }

  eliminarUsuario(userId: number):Observable<User>{
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<User>(url);
  }

  actualizarUsuario(usuarioId: number, user: User):Observable<User>{
    const url = `${this.apiUrl}/${usuarioId}`;
    return this.http.put<User>(url,user);
  }
}
