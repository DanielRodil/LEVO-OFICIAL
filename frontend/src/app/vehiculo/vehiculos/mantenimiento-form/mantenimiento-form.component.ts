import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { DatosTecnicosInteres } from "../../models/datos-tecnicos-interes";
import { Mantenimiento } from "../../models/mantenimiento";
import { MantenimientoImpl } from "../../models/mantenimiento-impl";
import { MantenimientoPreventivo } from "../../models/planes-preventivos";
import { Vehiculo } from "../../models/vehiculo";
import { MantenimientoService } from "../../service/mantenimiento.service";
import { VehiculoService } from "../../service/vehiculo.service";

@Component({
  selector: "app-mantenimiento-form",
  templateUrl: "./mantenimiento-form.component.html",
  styleUrls: ["./mantenimiento-form.component.css"],
})
export class MantenimientoFormComponent implements OnInit {

  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}vehiculos`;

  mantenimiento: Mantenimiento = new MantenimientoImpl();
  vehiculo!: Vehiculo;
  datosTecnicosInteres!: DatosTecnicosInteres;
  mantenimientoPreventivo!: MantenimientoPreventivo;

  constructor(
    private vehiculoService: VehiculoService,
    private mantenimientoService: MantenimientoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id: string = this.cargarId();
    console.log(id);
    this.vehiculoService.getVehiculo(id).subscribe((response) => {
      this.vehiculo = this.vehiculoService.mapearVehiculo(response);
      console.log(this.vehiculo);
    });
  }

  cargarId(): string {
    return this.activatedRoute.snapshot.params["id"];
  }

  onAddMantenimiento(): void {
    this.mantenimiento.vehiculo = `${this.urlEndPoint}/${this.vehiculo.id}`;
    this.mantenimientoService
      .crearMantenimiento(this.mantenimiento)
      .subscribe();
  }

  goBack(){
    this.router.navigate(['/administrador'])
  }
}
