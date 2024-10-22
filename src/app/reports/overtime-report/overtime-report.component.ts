import { Component } from '@angular/core';

@Component({
  selector: 'app-overtime-report',
  templateUrl: './overtime-report.component.html',
  styleUrl: './overtime-report.component.scss'
})
export class OvertimeReportComponent {
  
  generateReport() {
    // Lógica para obtener los datos de empleados fuera de horario
    console.log('Generar reporte de empleados fuera de horario');
  }
}
