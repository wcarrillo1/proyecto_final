import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  empleados: Employee[] = [];

  constructor (
    private empleadoService: EmpleadoService, 
    private router: Router )
  {}

  // ngOnInit(): void {
  //   this.obtenerEmpleados();
  // }
  ngOnInit() {
    this.empleados = this.empleadoService.getEmpleados();
  }

  // obtenerEmpleados(): void {
  //   this.empleadoService.getEmpleados().subscribe(
  //     (data) => {
  //       console.log('Empleados obtenidos:', data);
  //       this.empleados = data;
  //     },
  //     (error) => {
  //       console.error('Error al obtener empleados:', error);
  //     }
  //   );
  // }

  editEmployee(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/employees/edit', id]);
    }
  }

  // marcarTracking(id: number | undefined): void {
  //   if (id !== undefined) {
  //     localStorage.setItem('empleadoId', id.toString());
  //     this.router.navigate(['/time-tracking', id]);
  //   }  
  // }

  goToAddEmployee() {
    this.router.navigate(['/add-employee']); 
  }
}