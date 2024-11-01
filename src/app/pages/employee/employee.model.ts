export interface Employee {
  idUsuario: number;
  nombre: string;
  email: string;
  password: string;
  enabled: boolean;
  username: string;
  telefono?: string | null; 
  idDepartamento?: number | null;
  idHorario?: number | null;
  idRol: number[]; 
  apellido: string; 
}