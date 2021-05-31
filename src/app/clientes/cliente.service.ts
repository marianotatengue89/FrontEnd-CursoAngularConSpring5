import { Injectable } from '@angular/core';
import { CLIENTES} from './clientes.json'
import { Cliente } from './cliente'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ClienteService {
  private urlEndPoints:string = 'http://localhost:8080/api/clientes';
  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoints); 
    
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoints, cliente, {headers: this.httpHeaders});
  }


}
