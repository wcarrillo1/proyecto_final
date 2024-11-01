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

  ngOnInit() {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (data) => {
        this.empleados = data;
        console.log('Empleados obtenidos:', this.empleados);
      },
      (error) => {
        console.error('Error al obtener empleados:', error);
      }
    );
  }

  editEmployee(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/employees/edit', id]);
    }
  }

  goToAddEmployee() {
    this.router.navigate(['/add-employee']); 
  }
}