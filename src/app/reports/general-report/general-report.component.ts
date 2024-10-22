import { Component } from '@angular/core';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrl: './general-report.component.scss'
})
export class GeneralReportComponent {

  generateReport() {
    // Lógica para obtener los datos de marcaje general
    console.log('Generar reporte de empleados en general');
  }
}