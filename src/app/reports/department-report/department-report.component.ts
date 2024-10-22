import { Component } from '@angular/core';

@Component({
  selector: 'app-department-report',
  templateUrl: './department-report.component.html',
  styleUrl: './department-report.component.scss'
})
export class DepartmentReportComponent {
  startDate: string = '';  // Declaramos la variable startDate
  endDate: string = '';    // Declaramos la variable endDate

  constructor() {}

  generateReport() {
    // Aquí iría la lógica para generar el reporte por departamento
    console.log(`Generando reporte desde ${this.startDate} hasta ${this.endDate}`);
  }
}