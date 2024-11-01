import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSource = new Subject<{ email: string, password: string }>();
  userData$ = this.userDataSource.asObservable();

  sendUserData(email: string, password: string) {
    this.userDataSource.next({ email, password });
  }
}