import { Component } from '@angular/core';
import { EmpleadoService } from '../employee.service';
import { Router } from '@angular/router';
import { RegisterComponent } from '@modules/register/register.component';
import { UserService } from '@services/user.service';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  nombre: string = '';
  username: string = '';
  contrasena: string = '';
  telefono: string = ''; 
  idDepartamento: number = null;
  idHorario: number = null;
  activo: boolean = true;
  roleId: number = 2;
  apellido:string='';

  constructor(private empleadoService: EmpleadoService,
    private appService: AppService,
    private userService: UserService,
    private router: Router ) {}
  
  addEmployee(): void {
    const newEmployee = {
      username: this.username,
      password: this.contrasena,
      nombre: this.nombre, 
      apellido: this.apellido, 
      email: this.username, 
      telefono: this.telefono,
      rolId: this.roleId,
      idHorario: this.idHorario,
      idDepartamento: this.idDepartamento
    };
    
    this.appService.registerWithEmail(this.username, this.contrasena).then(() => {
    this.empleadoService.addEmpleado(newEmployee).subscribe(
      response => {
        if (response) {
          alert('Empleado agregado con éxito');
          this.resetForm();
          this.goToListEmployee();
        }
      },
      error => {
        console.error('Error al agregar empleado:', error);
        alert('Error al agregar empleado. Por favor, intente nuevamente.');
      }
    );
  })
  .catch(error => {
    console.error('Error al registrar usuario:', error);
    alert('Error al registrar el usuario. Por favor, intente nuevamente.');
  });
}

  resetForm(): void {
    this.username = '';
    this.nombre = '';
    this.contrasena = '';
    this.telefono = '';
    this.idDepartamento = null;
    this.idHorario = null;
    this.activo = true;
    this.roleId = 2;
  }

  goToListEmployee() {
    this.router.navigate(['/employee-list']); 
  }
}
