import { Injectable } from '@angular/core';
import { CLIENTES} from './clientes.json'
import { Cliente } from './cliente'
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';


@Injectable()
export class ClienteService {
  private urlEndPoints:string = 'http://localhost:8080/api/clientes';
  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.urlEndPoints).pipe(
      tap(response => {
        let clientes = response as Cliente[];
        console.log("ClienteService: tap 1");
        
        clientes.forEach(cliente => {
          console.log(cliente.nombre);
        })
      }),   
      
      map(response => {
        let clientes = response as Cliente[];
        console.log("ClienteService: tap 2");
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          
          // OPCION 1
          // cliente.createAt = formatDate(cliente.createAt, "dd/MM/yyyy", 'en-US');
          
          // OPCION 2          
          let datePipe = new DatePipe('es-AR');
          // let datePipeAux = datePipe.transform(cliente.createAt, "EEEE dd, MMMM yyyy");
          // cliente.createAt = datePipeAux!==null ? datePipeAux : "";
          
          return cliente;
      });
    },    
    ),
    tap(response => {
      let clientes = response as Cliente[];
      clientes.forEach(cliente => {
        console.log(cliente.nombre);
      })
    }), 
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

        if(e.status == 400){
          return throwError(e);
        }

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
        if(e.status == 400){
          throwError(e);
        }
        
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
