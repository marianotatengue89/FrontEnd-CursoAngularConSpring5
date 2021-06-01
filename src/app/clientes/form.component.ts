import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service'
import { Router, ActivatedRoute } from '@angular/router'
import swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  
  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //console.log(this.cliente);
    
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){        
        this.clienteService.getCliente(id).subscribe(
          cliente => this.cliente = cliente
          )
      }
    });
  }

  public create(): void{
    console.log("Clicked!");
    console.log(this.cliente);
    
    this.clienteService.create(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes']);
      swal.fire(  'Nuevo Cliente',  `Cliente ${this.cliente.nombre + " " + this.cliente.apellido} creado con éxito!`,  'success');
    });
  }

  public update(): void{
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire(  'Cliente Actualizado',  `Cliente ${this.cliente.nombre + " " + this.cliente.apellido} actualizado con éxito!`,  'success');

      }
    )
  }

}
