import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})


export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [
    {"id":1,"nombre":"Bronny","apellido":"De Meyer","email":"bdemeyer0@wufoo.com","createAt":"28/12/2020"},
    {"id":2,"nombre":"Kayla","apellido":"Grainger","email":"kgrainger1@pbs.org","createAt":"20/03/2021"},
    {"id":3,"nombre":"Annetta","apellido":"Frowde","email":"afrowde2@ning.com","createAt":"02/11/2020"},
    {"id":4,"nombre":"Glyn","apellido":"Tarbard","email":"gtarbard3@rakuten.co.jp","createAt":"03/01/2021"},
    {"id":5,"nombre":"Cate","apellido":"Franzettoini","email":"cfranzettoini4@youku.com","createAt":"07/06/2020"},
    {"id":6,"nombre":"Sam","apellido":"Fishleigh","email":"sfishleigh5@uiuc.edu","createAt":"10/04/2021"},
    {"id":7,"nombre":"Alan","apellido":"Grellier","email":"agrellier6@aboutads.info","createAt":"07/02/2021"},
    {"id":8,"nombre":"Cordie","apellido":"Keggin","email":"ckeggin7@usda.gov","createAt":"13/02/2021"},
    {"id":9,"nombre":"Isa","apellido":"Langmuir","email":"ilangmuir8@google.com.hk","createAt":"08/10/2020"},
    {"id":10,"nombre":"Nathalia","apellido":"Rentilll","email":"nrentilll9@merriam-webster.com","createAt":"11/09/2020"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
