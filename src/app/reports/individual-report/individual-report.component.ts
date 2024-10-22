import { Component } from '@angular/core';

@Component({
  selector: 'app-individual-report',
  templateUrl: './individual-report.component.html',
  styleUrl: './individual-report.component.scss'
})
export class IndividualReportComponent {
  employeeName: string = '';  // Declaramos la variable employeeName

  constructor() {}

  generateReport() {
    // Aquí iría la lógica para generar el reporte individual
    console.log(`Generando reporte para el empleado: ${this.employeeName}`);
  }
}