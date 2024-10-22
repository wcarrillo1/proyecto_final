import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrl: './report-admin.component.scss'
})
export class ReportAdminComponent {

  constructor(private router: Router) {}

  // Navega al reporte correspondiente
  navigateToReport(reportType: string) {
    this.router.navigate([`/reports/${reportType}`]);
  }
}