import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmpleadoService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit{
  employee: Employee = {
    id: 0,
    nombre: '',
    email: '',
    contrasena: '',
    activo: 1,
    username: '',
    telefono: null,
    departamento: null,
    horario: null,
  };
  isEditing = false;

  empleadosEnMemoria: Employee[] = [];

  constructor(
    private employeeService: EmpleadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      const empleadoExistente = this.employeeService.getEmployeeById(+id);
      // this.employeeService.getEmployeeById(+id).subscribe(data => {
      //   this.employee = data;
      // });
      if (empleadoExistente) {
        this.employee = { ...empleadoExistente };
      }
    }
  }
  saveEmployee(): void {
    // const updatedEmployee = {
    //   email: this.employee.email,
    //   username: this.employee.username,
    //   contrasena: this.employee.contrasena
    // };
    if (this.isEditing) {
      // this.employeeService.updateEmployee(this.employee.id, updatedEmployee).subscribe(() => {
      //   this.employeeService.updateEmployeeStatus(this.employee.id, this.employee.activo).subscribe(() => {
      //   alert('Empleado actualizado con éxito');
      //   this.router.navigate(['/employees']);
      // });
      // });
      // const index = this.empleadosEnMemoria.findIndex(emp => emp.id === this.employee.id);
      // if (index !== -1) {
      //   this.empleadosEnMemoria[index] = { ...this.employee };
      //   alert('Empleado actualizado en memoria');
      // }
      this.employeeService.updateEmployee(this.employee.id, this.employee);
      alert('Empleado actualizado en memoria');
    } else {
      // this.employeeService.addEmployee(updatedEmployee).subscribe(() => {
      //   this.router.navigate(['/employees']);
      // });
      // this.employee.id = this.empleadosEnMemoria.length + 1; // Asignar un ID simple para memoria
      // this.empleadosEnMemoria.push({ ...this.employee });
      // alert('Empleado agregado en memoria');
      // this.employeeService.addEmployee(this.employee);
      alert('Empleado Agregado Exitosamente');
    }
    this.router.navigate(['/employee-list']);
  }
}