import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmpleadoService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit{
  private baseUrlUpdate  = `${environment.apiUrl}/api`;
  employee: Employee = {
    idUsuario: 0,
    nombre: '',
    email: '',
    password: '',
    enabled: true,
    username: '',
    telefono: null,
    idDepartamento: null,
    idHorario: null,
    idRol: [], 
    apellido: ''
  };
  isEditing = false;

  constructor(
    private employeeService: EmpleadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.employeeService.getEmployeeById(+id).subscribe(
        (empleadoExistente: Employee) => {
        if (empleadoExistente) {
          this.employee = {
            ...empleadoExistente,
            idRol: empleadoExistente.idRol || [], 
            apellido: empleadoExistente.apellido || ''
          };
        }
      },
      (error) => {
        console.error('Error al obtener empleado:', error);
      }
    );
    }
  }
  
  saveEmployee(): void {
    const departamentoId = this.employee.idDepartamento; // Asumiendo que lo has obtenido del formulario
    const horarioId = this.employee.idHorario; // Lo mismo para el horario
    const rolesIds = this.employee.idRol.join(',');

    const url = `${this.baseUrlUpdate}/usuarios/${this.employee.idUsuario}?idDepartamento=${departamentoId}&idHorario=${horarioId}&idsRoles=${rolesIds}`;

    const body = {
      username: this.employee.username,
      password: this.employee.password,
      nombre: this.employee.nombre,
      apellido: this.employee.apellido,
      email: this.employee.email,
      telefono: this.employee.telefono,
      enabled: 1,
      departamento: {
        idDepartamento: Number(this.employee.idDepartamento),
        nombreDepartamento: "IT"
      },
      horario: {
        idHorario: Number(this.employee.idHorario),
        horaEntrada: "08:00", 
        horaSalida: "17:00",
        toleranciaEntrada: 10,
        toleranciaSalida: 10
      },
      roles:  [
        {
          id: 1,
          nombreRol: "Empleado"
        }
      ]
    };
    
    if (this.isEditing) {
      this.employeeService.updateEmployee(url, body).subscribe(
        () => {
          alert('Empleado actualizado exitosamente');
          this.router.navigate(['/employee-list']);
        },
        (error) => {
          console.error('Error al actualizar empleado:', error);
        }
      );
    } else {
      this.employeeService.addEmpleado(body).subscribe(
        () => {
          alert('Empleado agregado exitosamente');
          this.router.navigate(['/employee-list']);
        },
        (error) => {
          console.error('Error al agregar empleado:', error);
        }
      );
    }
  }
}