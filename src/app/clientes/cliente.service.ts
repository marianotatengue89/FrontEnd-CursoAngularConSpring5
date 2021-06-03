import { Injectable } from '@angular/core';
import { CLIENTES} from './clientes.json'
import { Cliente } from './cliente'
import { Observable, of ,throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable()
export class ClienteService {
  private urlEndPoints:string = 'http://localhost:8080/api/clientes';
  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    // return this.http.get<Cliente[]>(this.urlEndPoints); 

    return this.http.get(this.urlEndPoints).pipe(
      map(response => response as Cliente[])
    ); 
    
  }
  
  getCliente(id: number) : Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoints}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
        
      })
    )
  }

  /* Alternativa con tipo de Dato 'Cliente' para crear el cliente cuando se recibe un map del backend.
  Se debe devolver un tipo Observable de cliente */
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoints, cliente, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }


  /* Alternativa con tipo de Dato 'any' para crear el cliente cuando se recibe un map del backend */
  update(cliente: Cliente) : Observable<any>{
    return this.http.put<any>(`${this.urlEndPoints}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })    
    );
  }

  
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoints}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
