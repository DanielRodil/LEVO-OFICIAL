import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehiculo } from 'src/app/vehiculo/models/vehiculo';
import { VehiculoImpl } from 'src/app/vehiculo/models/vehiculo-impl';

@Component({
  selector: 'app-busqueda-item-usuario',
  templateUrl: './busqueda-item-usuario.component.html',
  styleUrls: ['./busqueda-item-usuario.component.css']
})
export class BusquedaItemUsuarioComponent implements OnInit {


  @Input() matricula:string="";
  @Input() vehiculo: Vehiculo = new VehiculoImpl;
  @Output() vehiculoConsultar = new EventEmitter<VehiculoImpl>();


  constructor() { }

  ngOnInit(): void {
  }

  consultar(): void{
    this.vehiculoConsultar.emit(this.vehiculo);
  }


}
