import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReportService } from '@services/report.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrl: './report-admin.component.scss'
})
export class ReportAdminComponent {
  private baseUrl= environment.apiReports; 
  isModalOpen = false;
  reportUrl: SafeResourceUrl | null = null;
  selectedDepartmentId: number;
  employeeId: number;
  selectedEmployeeId: number;
  departments = [
    { id: 1, name: 'Recursos Humanos' }, 
    { id: 2, name: 'Tecnología' },
    { id: 3, name: 'Ventas' }
  ];
  employees = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'Ana López' },
    { id: 3, name: 'Carlos García' }
  ];
  isDepartmentModalOpen = false;
  isEmployeeModalOpen = false;
  isDownloadAction = false;

  constructor(private reportService: ReportService,private sanitizer: DomSanitizer) {}

  downloadReport(reportType: string) {
    const reportEndpoint = this.getReportEndpoint(reportType, true); // Pass `true` for downloading
    if (reportEndpoint) {
      this.reportService.downloadReport(reportEndpoint).subscribe(blob => {
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'reporte.pdf'; // Nombre del archivo descargado
        downloadLink.click();
        window.URL.revokeObjectURL(url); // Limpiamos el objeto URL después de la descarga
      });
    }
  }

  previewReport(reportType: string) {
    if (reportType === 'department') {
      this.isDepartmentModalOpen = true; 
    } else if (reportType === 'individual') {
      this.isEmployeeModalOpen = true; 
    } else {
      const reportEndpoint = this.getReportEndpoint(reportType, false);
      if (reportEndpoint) {
        this.reportService.getReportPreview(reportEndpoint).subscribe(blob => {
          const url = window.URL.createObjectURL(blob);
          this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.isModalOpen = true;
        });
      }
    }
  }

  openDepartmentModal(action: 'preview' | 'download') {
    this.isDownloadAction = (action === 'download');
    this.isDepartmentModalOpen = true;
  }
  
  confirmDepartmentAction() {
    if (this.selectedDepartmentId) {
      const requestBody = { departamentoId: this.selectedDepartmentId };

      if (this.isDownloadAction) {
        this.reportService.downloadDepartmentReport(requestBody).subscribe(blob => {
          const downloadLink = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          downloadLink.href = url;
          downloadLink.download = 'reporte_departamento.pdf';
          downloadLink.click();
          window.URL.revokeObjectURL(url); 
          this.closeDepartmentModal(); 
        });
      } else {
        const requestBody = { departamentoId: this.selectedDepartmentId };
        this.reportService.getDepartmentReport(requestBody, false).subscribe(blob => {
          const url = window.URL.createObjectURL(blob);
          this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.isModalOpen = true;
          this.closeDepartmentModal(); 
        });
      }
    }
  }


  closeDepartmentModal() {
    this.isDepartmentModalOpen = false;
  }
  
  openEmployeeModal(action: 'preview' | 'download') {
    this.isDownloadAction = (action === 'download');
    this.isEmployeeModalOpen = true;
  }

  confirmEmployeeAction() {
    if (this.selectedEmployeeId) {
      const requestBody = { usuarioId: this.selectedEmployeeId };
  
      if (this.isDownloadAction) {
        this.reportService.downloadIndividualReport(requestBody).subscribe(blob => {
          const downloadLink = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          downloadLink.href = url;
          downloadLink.download = 'reporte_individual_marcaje.pdf'; 
          downloadLink.click();
          window.URL.revokeObjectURL(url); 
          this.closeEmployeeModal(); 
        });
      } else {
        const requestBody = { usuarioId: this.selectedEmployeeId };
        this.reportService.getIndividualReport(requestBody, false).subscribe(blob => {
          const url = window.URL.createObjectURL(blob);
          this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.isModalOpen = true;
          this.closeEmployeeModal(); 
        });
      }
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.reportUrl = null;
  }

  onModalClick(event: MouseEvent) {
    this.closeModal();
    this.closeDepartmentModal();
    this.closeEmployeeModal();
  }


closeEmployeeModal() {
  this.isEmployeeModalOpen = false;
}
  private getReportEndpoint(reportType: string, download: boolean): string {
    const downloadParam = download ? '?descarga=true' : ''; 

    switch (reportType) {
      case 'department':
        return this.selectedDepartmentId
        ? `/reportes/departamento?id=${this.selectedDepartmentId}${downloadParam}`:''; 
      case 'general':
        return `/reportes/marcajeGeneral${downloadParam}`;
      case 'individual':
        return this.selectedEmployeeId 
        ? `/reportes/pdf-individual?id=${this.selectedEmployeeId}${downloadParam}`: '';
      case 'overtime':
        return `/reportes/pdf-fuera-horario${downloadParam}`;
      case 'early-checkout':
        return `/reportes/pdf-antes-hora-salida${downloadParam}`;
      default:
        return '';
    }
  }
}