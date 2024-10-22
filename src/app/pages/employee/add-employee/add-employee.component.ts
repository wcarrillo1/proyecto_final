import { Component } from '@angular/core';
import { EmpleadoService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  username: string = '';
  email: string = '';
  contrasena: string = '';
  activo: boolean = true;
  role: string = 'USER';

  empleados: any[] = [];
  // constructor(private empleadoService: EmpleadoService) {}
  constructor(private empleadoService: EmpleadoService) {}
  
  addEmployee(): void {
    const newEmployee = {
      id: this.empleados.length + 1, 
      username: this.username,
      email: this.email,
      contrasena: this.contrasena,
      activo: this.activo,
      roles: [this.role] 
    };

    this.empleadoService.addEmpleado(newEmployee);
    console.log('Empleado agregado en memoria:', newEmployee);
  
    alert('Empleado agregado en memoria');
    this.resetForm();

    /*
    this.empleadoService.addEmployee(newEmployee).subscribe(
      response => {
        if (response.status === 200) {
          alert('Empleado agregado con éxito');
          console.log('Empleado agregado con éxito:', response);
          this.resetForm();
        }
      },
      error => {
        console.error('Error al agregar empleado:', error);
      }
    );
    */
  }

  resetForm(): void {
    this.username = '';
    this.email = '';
    this.contrasena = '';
    this.activo = true;
    this.role = 'USER';
  }
}
