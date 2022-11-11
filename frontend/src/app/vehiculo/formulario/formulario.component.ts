import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Router, ActivatedRoute } from "@angular/router";
import { DatosTecnicosInteresService } from "../service/datos-tecnicos-interes.service";
import { MantenimientoPreventivoService } from "../service/mantenimiento-preventivo.service";
import { VehiculoService } from "../service/vehiculo.service";
import { DatosTecnicosInteres } from "../models/datos-tecnicos-interes";
import { DatosTecnicosInteresImpl } from "../models/datos-tecnicos-interes-impl";
import { MantenimientoPreventivoImpl } from "../models/planes-preventivos-impl";
import { Vehiculo } from "../models/vehiculo";
import { VehiculoImpl } from "../models/vehiculo-impl";
import { faArrowLeft, faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { AvisokmService } from "src/app/administrador/service/avisokm.service";

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})

export class FormularioComponent implements OnInit {

  vehiculo: Vehiculo = new VehiculoImpl();
  datosTecnicosInteres: DatosTecnicosInteres = new DatosTecnicosInteresImpl();
  mantenimientoPreventivo: MantenimientoPreventivoImpl = new MantenimientoPreventivoImpl();
  tipoVehiculo;

  firstFormGroup = this._formBuilder.group({
    matricula: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    fechaAlta: ["", Validators.required],
    marca: ["", [Validators.required, Validators.minLength(2)]],
    modelo: ["", Validators.required],
    tipoVehiculo: ["", Validators.required],
    unidadDestino: ["", Validators.required],
    fechaAdjudicacion: ["", Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    bastidor: ["", [Validators.required,Validators.minLength(17)]],
    color: ["", Validators.required],
    combustible: ["", Validators.required],
    cambio: ["", Validators.required],
    capacidadDeposito: ["", Validators.required],
    lubricanteMotor: ["", Validators.required],
    capacidadCarter: ["", Validators.required],
    presionNeumaticosDelanteros: ["", Validators.required],
    presionNeumaticosTraseros: ["", Validators.required],
    tipoCubiertas: ["", Validators.required],
    numeroBaterias: ["", Validators.required],
    voltajeBaterias: ["", Validators.required],
    amperajeBaterias: ["", Validators.required],
    amperiosHoraBaterias: ["", Validators.required],
    clasificacionMedioambiental: ["", Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    condicionesUso: ["", Validators.required],
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

  constructor(
    private _formBuilder: FormBuilder,
    private vehiculoService: VehiculoService,
    private avisoKmService: AvisokmService,
    private datosTecnicosInteresService: DatosTecnicosInteresService,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.tipoVehiculo = ["Turismo", "Todo Terreno", "Motocicleta", "Otros"];
  }

  ngOnInit(): void { }

  cargarId(): string {
    return this.activatedRoute.snapshot.params["id"];
  }

  create(): void {
    this.vehiculoService.crearVehiculo(this.vehiculo);
    this.datosTecnicosInteresService.creardatosTecnicosInteres(this.datosTecnicosInteres);
    this.mantenimientoPreventivoService.crearMantenimientoPreventivo(this.mantenimientoPreventivo);
  }

  onAddVehiculo(): void {
    this.datosTecnicosInteresService
      .creardatosTecnicosInteres(this.datosTecnicosInteres)
      .subscribe((datosTecnicos) => {

        this.vehiculo.datosTecnicosInteres =
          datosTecnicos._links.datotecnicointeres.href;

        this.mantenimientoPreventivoService
          .crearMantenimientoPreventivo(this.mantenimientoPreventivo)
          .subscribe((planPreventivo) => {
            this.vehiculo.planespreventivos = planPreventivo._links.planpreventivo.href;
            console.log(this.mantenimientoPreventivo);
            this.vehiculo.kilometrosActuales = 0; //para editar se omite esta linea
            this.avisoKmService.crearAvisoKm(this.mantenimientoPreventivo, this.vehiculo.kilometrosActuales ).subscribe(response => {
              this.vehiculo.avisokms = response._links.avisokm.href;
              console.log(response);
              this.vehiculoService.crearVehiculo(this.vehiculo).subscribe();
            })

          });
      });
    // let id: string = this.cargarId();
    // this.router.navigate([`/vehiculos/consultar/${id}`]);
  }

  onAddDatosTecnicosInteres(): void {
    let id: string = this.cargarId();
    this.router.navigate([`/datostecnicosinteres/editar/${id}`]);
  }

  onAddMantenimientoPreventivo(): void {
    let id: string = this.cargarId();
    this.router.navigate([`/planespreventivos/editar/${id}`]);
  }

  volver= faArrowLeft;

  goBack(){
    this.router.navigate(['/administrador'])
  }
}
