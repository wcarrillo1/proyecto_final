import { Component } from '@angular/core';

@Component({
  selector: 'app-early-checkout-report',
  templateUrl: './early-checkout-report.component.html',
  styleUrl: './early-checkout-report.component.scss'
})
export class EarlyCheckoutReportComponent {
  
  generateReport() {
    // Lógica para obtener los datos de empleados que marcaron antes de tiempo
    console.log('Generar reporte de empleados que marcaron antes de tiempo');
  }
}
