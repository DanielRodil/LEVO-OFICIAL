import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatosTecnicosInteres } from "../../models/datos-tecnicos-interes";
import { DatosTecnicosInteresImpl } from "../../models/datos-tecnicos-interes-impl";
import { MantenimientoPreventivoImpl } from "../../models/planes-preventivos-impl";
import { Vehiculo } from "../../models/vehiculo";
import { VehiculoImpl } from "../../models/vehiculo-impl";
import { DatosTecnicosInteresService } from "../../service/datos-tecnicos-interes.service";
import { MantenimientoPreventivoService } from "../../service/mantenimiento-preventivo.service";
import { VehiculoService } from "../../service/vehiculo.service";
import { FormBuilder } from "@angular/forms";
import { MantenimientoImpl } from "../../models/mantenimiento-impl";
import { Mantenimiento } from "../../models/mantenimiento";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-vehiculo-consulta",
  templateUrl: "./vehiculo-consulta.component.html",
  styleUrls: ["./vehiculo-consulta.component.css"],
})

export class VehiculoConsultaComponent implements OnInit {

  vehiculo: Vehiculo = new VehiculoImpl();
  mantenimiento: Mantenimiento = new MantenimientoImpl();
  mantenimientosVerDatos: MantenimientoImpl[] = [];
  // mantenimientoPreventivoVerDatos: MantenimientoPreventivoImpl = new MantenimientoPreventivoImpl();
  // datosTecnicosInteresVerDatos: DatosTecnicosInteresImpl = new DatosTecnicosInteresImpl();

  @Input() datosTecnicosInteres: DatosTecnicosInteres = new DatosTecnicosInteresImpl();
  @Output() datosTecnicosInteresConsultar = new EventEmitter<DatosTecnicosInteresImpl>();

  @Input() mantenimientoPreventivo: MantenimientoPreventivoImpl = new MantenimientoPreventivoImpl();
  @Output() mantenimientoPreventivoConsultar = new EventEmitter<MantenimientoPreventivoImpl>();

  @Input() mantenimientos: Mantenimiento[] = [];
  @Output() mantenimientoConsultar = new EventEmitter<MantenimientoImpl>();

  firstFormGroup = this._formBuilder.group({
    matricula: [""],
    fechaAlta: [""],
    marca: [""],
    modelo: [""],
    tipoVehiculo: [""],
    unidadDestino: [""],
    fechaAdjudicacion: [""],
  });

  secondFormGroup = this._formBuilder.group({
    bastidor: [""],
    color: [""],
    combustible: [""],
    cambio: [""],
    capacidadDeposito: [""],
    lubricanteMotor: [""],
    capacidadCarter: [""],
    presionNeumaticosDelanteros: [""],
    presionNeumaticosTraseros: [""],
    tipoCubiertas: [""],
    numeroBaterias: [""],
    voltajeBaterias: [""],
    amperajeBaterias: [""],
    amperiosHoraBaterias: [""],
    clasificacionMedioambiental: [""],
  });

  thirdFormGroup = this._formBuilder.group({
    condicionesUso: [""],
    observaciones: [""],
    liquidoFrenosKm: [""],
    liquidoFrenosMes: [""],
    operacionesSistematicasKm: [""],
    operacionesSistematicasMes: [""],
    filtroAireKm: [""],
    filtroAireMes: [""],
    filtroAireHabitaculoKm: [""],
    filtroAireHabitaculoMes: [""],
    filtroCombustibleKm: [""],
    filtroCombustibleMes: [""],
    filtroAntipolenKm: [""],
    filtroAntipolenMes: [""],
    correaDistribucionKm: [""],
    correaDistribucionMes: [""],
    kitDistribucionKm: [""],
    kitDistribucionMes: [""],
    reglajeProyectoresKm: [""],
    reglajeProyectoresMes: [""],
    pHLiquidoRefrigeracionKm: [""],
    pHLiquidoRefrigeracionMes: [""],
    liquidoRefrigeracionKm: [""],
    liquidoRefrigeracionMes: [""],
    correaArrastreAccesoriosKm: [""],
    correaArrastreAccesoriosMes: [""],
    kitCorreaArrastreAccesoriosKm: [""],
    kitCorreaArrastreAccesoriosMes: [""],
    anticongelanteKm: [""],
    anticongelanteMes: [""],
    aceiteTransmisionKm: [""],
    aceiteTransmisionMes: [""],
    bujiasEncendidoKm: [""],
    bujiasEncendidoMes: [""],
  });

  fourthFormGroup = this._formBuilder.array;
  constructor(
    private vehiculoService: VehiculoService,
    private datosTecnicosInteresService: DatosTecnicosInteresService,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    let id: string = this.cargarVehiculo();

    this.vehiculoService.getVehiculo(id).subscribe((response) => {
      this.vehiculo = this.vehiculoService.mapearVehiculo(response);
    });

    this.datosTecnicosInteresService
      .getDatosTecnicosInteresVehiculo(id)
      .subscribe((response) =>
          (this.datosTecnicosInteres = this.datosTecnicosInteresService.mapearDatosTecnicosInteres(response))
    );

    this.mantenimientoPreventivoService
      .getPP(id)
      .subscribe((response) =>
          (this.mantenimientoPreventivo =
            this.mantenimientoPreventivoService.mapearMantenimientoPreventivo(response))
    );
  }

  cargarVehiculo(): string {
    return this.activatedRoute.snapshot.params["id"];
  }

  consultarMR(): void {
    this.mantenimientoConsultar.emit(this.mantenimiento);
  }

  onMantenimientoConsultar(mantenimientos: MantenimientoImpl[]) {
    this.verDatosMR(mantenimientos);
    let url = `mantenimientosrealizados/consultar/${this.vehiculo.id}`;
    this.router.navigate([url]);
  }

  verDatosMR(mantenimientos: MantenimientoImpl[]): void {
    this.mantenimientosVerDatos = mantenimientos;
  }
  rol:any=sessionStorage.getItem('ROLE');
  
  
  goBack(){
    console.log(this.rol);
    if(this.rol=='ADMIN'){
      this.router.navigate(['/administrador']);
    }
    if(this.rol=='USER'){
      this.router.navigate(['/usuario']);
    }
  }

  volver= faArrowLeft;
}
