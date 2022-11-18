import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Avisokm } from "src/app/administrador/models/avisokm";
import { AvisokmService } from "src/app/administrador/service/avisokm.service";
import { environment } from "src/environments/environment";
import { DatosTecnicosInteres } from "../../models/datos-tecnicos-interes";
import { Mantenimiento } from "../../models/mantenimiento";
import { MantenimientoImpl } from "../../models/mantenimiento-impl";
import { MantenimientoPreventivo } from "../../models/planes-preventivos";
import { Vehiculo } from "../../models/vehiculo";
import { DatosTecnicosInteresService } from "../../service/datos-tecnicos-interes.service";
import { MantenimientoPreventivoService } from "../../service/mantenimiento-preventivo.service";
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

  volver= faArrowLeft;

  mantenimiento: Mantenimiento = new MantenimientoImpl();
  vehiculo!: Vehiculo;
  datosTecnicosInteres!: DatosTecnicosInteres;
  mantenimientoPreventivo!: MantenimientoPreventivo;
  avisokm!: Avisokm;

  constructor(
    private vehiculoService: VehiculoService,
    private mantenimientoService: MantenimientoService,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private datosTecnicosInteresService: DatosTecnicosInteresService,
    private avisokmService: AvisokmService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id: string = this.cargarId();
    console.log(id);
    this.vehiculoService.getVehiculo(id).subscribe((response) => {
      this.vehiculo = this.vehiculoService.mapearVehiculo(response);
      this.datosTecnicosInteresService.getDatosTecnicosInteresVehiculo(id).subscribe(response => {
        this.datosTecnicosInteres = this.datosTecnicosInteresService.mapearDatosTecnicosInteres(response);})
        this.mantenimientoPreventivoService.getPP(id).subscribe(response => {
          this.mantenimientoPreventivo = this.mantenimientoPreventivoService.mapearMantenimientoPreventivo(response);})
          this.avisokmService.getAvisoKm(id).subscribe(response => {
            this.avisokm = this.avisokmService.mapearAvisokm(response)
            })
          console.log(this.vehiculo);
    });
  }

  cargarId(): string {
    return this.activatedRoute.snapshot.params["id"];
  }

  onAddMantenimiento(): void {
    this.mantenimiento.vehiculo = `${this.urlEndPoint}/${this.vehiculo.id}`;
    this.mantenimientoService.crearMantenimiento(this.mantenimiento).subscribe(response =>{
      this.vehiculo.kilometrosActuales = response.kilometrosMantenimiento;

      if (response.liquidoFrenos === true) {
        this.mantenimientoPreventivo.liquidoFrenosKm += response.kilometrosMantenimiento;
      } else if (response.liquidoFrenos === false) {
        this.mantenimientoPreventivo.liquidoFrenosKm = this.mantenimientoPreventivo.liquidoFrenosKm;
      }
      
      if (response.operacionesSistematicas === true) {
        this.mantenimientoPreventivo.operacionesSistematicasKm += response.kilometrosMantenimiento;
      } else if (response.operacionesSistematicas === false) {
        this.mantenimientoPreventivo.operacionesSistematicasKm = this.mantenimientoPreventivo.operacionesSistematicasKm;
      } 

      if (response.filtroAire === true) {
        this.mantenimientoPreventivo.filtroAireKm += response.kilometrosMantenimiento;
      } else if (response.filtroAire === false) {
        this.mantenimientoPreventivo.filtroAireKm = this.mantenimientoPreventivo.filtroAireKm;
      } 

      if (response.filtroAireHabitaculo === true) {
        this.mantenimientoPreventivo.filtroAireHabitaculoKm += response.kilometrosMantenimiento;
      } else if (response.filtroAireHabitaculo === false) {
        this.mantenimientoPreventivo.filtroAireHabitaculoKm = this.mantenimientoPreventivo.filtroAireHabitaculoKm;
      } 

      if (response.filtroCombustible === true) {
        this.mantenimientoPreventivo.filtroCombustibleKm += response.kilometrosMantenimiento;
      } else if (response.filtroCombustible === false) {
        this.mantenimientoPreventivo.filtroCombustibleKm = this.mantenimientoPreventivo.filtroCombustibleKm;
      }
      
      if (response.filtroAntipolen === true) {
        this.mantenimientoPreventivo.filtroAntipolenKm += response.kilometrosMantenimiento;
      } else if (response.filtroAntipolen === false) {
        this.mantenimientoPreventivo.filtroAntipolenKm = this.mantenimientoPreventivo.filtroAntipolenKm;
      }
      
      if (response.correaDistribucion === true) {
        this.mantenimientoPreventivo.correaDistribucionKm += response.kilometrosMantenimiento;
      } else if (response.correaDistribucion === false) {
        this.mantenimientoPreventivo.correaDistribucionKm = this.mantenimientoPreventivo.correaDistribucionKm;
      }
      
      if (response.kitDistribucion === true) {
        this.mantenimientoPreventivo.kitDistribucionKm += response.kilometrosMantenimiento;
      } else if (response.kitDistribucion === false) {
        this.mantenimientoPreventivo.kitDistribucionKm = this.mantenimientoPreventivo.kitDistribucionKm;
      }
      
      if (response.reglajeProyectores === true) {
        this.mantenimientoPreventivo.reglajeProyectoresKm += response.kilometrosMantenimiento;
      } else if (response.reglajeProyectores === false) {
        this.mantenimientoPreventivo.reglajeProyectoresKm = this.mantenimientoPreventivo.reglajeProyectoresKm;
      }

      if (response.pHLiquidoRefrigeracion === true) {
        this.mantenimientoPreventivo.pHLiquidoRefrigeracionKm += response.kilometrosMantenimiento;
      } else if (response.pHLiquidoRefrigeracion === false) {
        this.mantenimientoPreventivo.pHLiquidoRefrigeracionKm = this.mantenimientoPreventivo.pHLiquidoRefrigeracionKm;
      }

      if (response.liquidoRefrigeracion === true) {
        this.mantenimientoPreventivo.liquidoRefrigeracionKm += response.kilometrosMantenimiento;
      } else if (response.liquidoRefrigeracion === false) {
        this.mantenimientoPreventivo.liquidoRefrigeracionKm = this.mantenimientoPreventivo.liquidoRefrigeracionKm;
      }

      if (response.correaArrastreAccesorios === true) {
        this.mantenimientoPreventivo.correaArrastreAccesoriosKm += response.kilometrosMantenimiento;
      } else if (response.correaArrastreAccesorios === false) {
        this.mantenimientoPreventivo.correaArrastreAccesoriosKm = this.mantenimientoPreventivo.correaArrastreAccesoriosKm;
      }

      if (response.kitCorreaArrastreAccesorios === true) {
        this.mantenimientoPreventivo.kitCorreaArrastreAccesoriosKm += response.kilometrosMantenimiento;
      } else if (response.kitCorreaArrastreAccesorios === false) {
        this.mantenimientoPreventivo.kitCorreaArrastreAccesoriosKm = this.mantenimientoPreventivo.kitCorreaArrastreAccesoriosKm;
      }

      if (response.anticongelante === true) {
        this.mantenimientoPreventivo.anticongelanteKm += response.kilometrosMantenimiento;
      } else if (response.anticongelante === false) {
        this.mantenimientoPreventivo.anticongelanteKm = this.mantenimientoPreventivo.anticongelanteKm;
      }

      if (response.aceiteTransmision === true) {
        this.mantenimientoPreventivo.aceiteTransmisionKm += response.kilometrosMantenimiento;
      } else if (response.aceiteTransmision === false) {
        this.mantenimientoPreventivo.aceiteTransmisionKm = this.mantenimientoPreventivo.aceiteTransmisionKm;
      }

      if (response.bujiasEncendido === true) {
        this.mantenimientoPreventivo.bujiasEncendidoKm += response.kilometrosMantenimiento;
      } else if (response.bujiasEncendido === false) {
        this.mantenimientoPreventivo.bujiasEncendidoKm = this.mantenimientoPreventivo.bujiasEncendidoKm;
      }
      
      this.vehiculo.datosTecnicosInteres = `${this.host}datostecnicosinteres/${this.datosTecnicosInteres.id}`;
      this.vehiculo.planespreventivos = `${this.host}planespreventivos/${this.mantenimientoPreventivo.id}`;
      this.vehiculo.avisokms = `${this.host}avisokms/${this.avisokm.id}`;

      this.mantenimientoPreventivoService.updateMantenimmientoPreventivo(this.mantenimientoPreventivo).subscribe();

      this.vehiculoService.updateVehiculo(this.vehiculo).subscribe(response => {
        this.avisokmService
      .updateAvisokm(this.avisokm, this.mantenimientoPreventivo, response.kilometrosActuales)
      .subscribe();
      });

    });

    this.router.navigate([`administrador/consultar/${this.vehiculo.id}`]);
  }

  goBack(){
    this.router.navigate(['/administrador'])
  }
}