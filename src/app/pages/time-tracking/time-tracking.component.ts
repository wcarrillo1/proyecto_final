import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@services/app.service';
import { MarcajeService } from '@services/marcaje.service';
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
  mensajeMarcaje: string = 'Marcación de Entrada';
  registrarSalidaDisabled: boolean = false; 
  errorMessage: string = '';

  public user;

  constructor(
    private appService: AppService,
    private marcajeService: MarcajeService,
    private route: ActivatedRoute) {
      const storedUsername = localStorage.getItem('username');
      this.username = storedUsername ? storedUsername : 'Empleado';
  }

  ngOnInit(): void {
    this.user = this.appService.user;
    const storedSessionId = localStorage.getItem('sessionId');
    this.sessionId = storedSessionId ? parseInt(storedSessionId, 10) : null;

    if (!storedSessionId) {
      this.sessionId = 12345;  // Valor simulado de sessionId
      localStorage.setItem('sessionId', this.sessionId.toString());
    } else {
      this.sessionId = parseInt(storedSessionId, 10);
    }

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.empleadoId = parseInt(id, 10);
      }
    });
    
    const userId = localStorage.getItem('userId');
    interval(1000).subscribe(() => {
      this.currentTime = new Date().toLocaleTimeString();
    });

    setTimeout(() => {
      this.logout; 
    }, 30 * 60 * 1000);

    setTimeout(() => {
      this.errorMessage = ''; 
    }, 5000);
  }

  getDisplayName() {
    if (this.user?.displayName) {
      return this.user.displayName;
    } else {
      return localStorage.getItem('username') || 'Usuario desconocido';
    }
  }

  logout() {
    this.appService.logout();
  }

  registrarEntrada(): void {
    const userId = localStorage.getItem('empleadoId');
    if (userId) {
      this.marcajeService.registrarEntrada(userId).subscribe({
        next: (response) => {
          console.log('Entrada registrada:', response);
          this.registrarSalidaDisabled = false;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error al registrar entrada:', error);
        }
      });
    }else {
      console.error('No hay usuario logueado.');
    }
  }

  
registrarSalida(): void {
  const userId = localStorage.getItem('empleadoId');
  if (userId) {
    this.marcajeService.registrarSalida(userId).subscribe({
      next: (response) => {
        console.log('Salida registrada:', response);
      },
      error: (error) => {
        console.error('Error al registrar salida:', error);
        if (error.status === 400 && error.error === 'El usuario no tiene una entrada sin salida') {
          this.errorMessage = 'El usuario no tiene una entrada sin salida'; 
          this.registrarSalidaDisabled = true; 
          setTimeout(() => {
            this.errorMessage = ''; 
          }, 5000);
        } else {
          console.error('Error al registrar salida:', error);
        }
      }
    });
  }else {
    console.error('No hay usuario logueado.');
  }
}
}