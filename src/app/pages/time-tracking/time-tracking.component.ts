import { Component, OnInit } from '@angular/core';
// import { TimeTrackingService } from '../services/time-tracking.service';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.css'] 
})
export class TimeTrackingComponent implements OnInit{
  currentTime: string = '';
  sessionId: number | null = null;
  empleadoId: number = 0;
  username: string = '';
  sesionInfo: any;

  constructor(
    // private trackingService: TimeTrackingService,
    private route: ActivatedRoute) {
    const storedUsername = localStorage.getItem('username');
    this.username = storedUsername ? storedUsername : 'Empleado';
  }

  ngOnInit(): void {
    const storedSessionId = localStorage.getItem('sessionId');
    this.sessionId = storedSessionId ? parseInt(storedSessionId, 10) : null;

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.empleadoId = parseInt(id, 10);
      }
    });

    interval(1000).subscribe(() => {
      this.currentTime = new Date().toLocaleTimeString();
    });
  }

  iniciarSesion(): void {
    if (!this.empleadoId) {
      console.error('El empleadoId es inválido.');
      return;
    }

    // this.trackingService.iniciarSesion(this.empleadoId).subscribe({
    //   next: (response) => {
    //     if (typeof response === 'number') {
    //       this.sessionId = response;
    //       localStorage.setItem('sessionId', response.toString());
    //       console.log('Sesión iniciada, id:', this.sessionId);
    //     } else {
    //       console.error('Respuesta inválida del servidor:', response);
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error al iniciar la sesión:', err);
    //   }
    // });
  }

  finalizarSesion(): void {
    if (!this.sessionId) {
      console.error('El sessionId es inválido.');
      return;
    }
  
    // this.trackingService.finalizarSesion(this.sessionId).subscribe({
    //   next: (response) => {
    //     this.sesionInfo = response;
    //     this.sessionId = null;
    //     localStorage.removeItem('sessionId');
    //     console.log('Sesión finalizada:', this.sesionInfo);
    //   },
    //   error: (err) => {
    //     console.error('Error al finalizar la sesión:', err);
    //   }
    // });
  }

  // registrarEntrada(): void {
  //   if (this.empleadoId) {
  //     this.trackingService.registrarMarcaje(this.empleadoId, 'ENTRADA').subscribe((response) => {
  //       console.log('Entrada registrada con ID:', response.id);
  //     });
  //   }
  // }

  // registrarSalida(): void {
  //   if (this.empleadoId) {
  //     this.trackingService.registrarMarcaje(this.empleadoId, 'SALIDA').subscribe((response) => {
  //       console.log('Salida registrada con ID:', response.id);
  //     });
  //   }
  // }
}