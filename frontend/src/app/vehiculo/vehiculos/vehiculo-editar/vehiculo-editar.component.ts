import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Avisokm } from 'src/app/administrador/models/avisokm';
import { AvisokmImpl } from 'src/app/administrador/models/avisokm-impl';
import { AvisokmService } from 'src/app/administrador/service/avisokm.service';
import { environment } from 'src/environments/environment.prod';
import { DatosTecnicosInteres } from '../../models/datos-tecnicos-interes';
import { DatosTecnicosInteresImpl } from '../../models/datos-tecnicos-interes-impl';
import { Mantenimiento } from '../../models/mantenimiento';
import { MantenimientoImpl } from '../../models/mantenimiento-impl';
import { MantenimientoPreventivo } from '../../models/planes-preventivos';
import { MantenimientoPreventivoImpl } from '../../models/planes-preventivos-impl';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoImpl } from '../../models/vehiculo-impl';
import { DatosTecnicosInteresService } from '../../service/datos-tecnicos-interes.service';
import { MantenimientoPreventivoService } from '../../service/mantenimiento-preventivo.service';
import { MantenimientoService } from '../../service/mantenimiento.service';
import { VehiculoService } from '../../service/vehiculo.service';

@Component({
  selector: 'app-vehiculo-editar',
  templateUrl: './vehiculo-editar.component.html',
  styleUrls: ['./vehiculo-editar.component.css'],
})
export class VehiculoEditarComponent implements OnInit {

  urlEndpoint = environment.host;

  vehiculo: Vehiculo = new VehiculoImpl();
  datosTecnicosInteres: DatosTecnicosInteres = new DatosTecnicosInteresImpl();
  mantenimientoPreventivo: MantenimientoPreventivo = new MantenimientoPreventivoImpl();
  avisokm: Avisokm = new AvisokmImpl();
  mantenimientoPreventivoVerDatos: MantenimientoPreventivoImpl = new MantenimientoPreventivoImpl();
  datosTecnicosInteresVerDatos: DatosTecnicosInteresImpl = new DatosTecnicosInteresImpl();
  mantenimientoVerDatos: Mantenimiento = new MantenimientoImpl();
  mantenimientos: Mantenimiento[] = [];

  @Input() mantenimiento: Mantenimiento = new MantenimientoImpl();
  @Output() mantenimientoConsultar = new EventEmitter<MantenimientoImpl>();
  @Output() mantenimientoEditar = new EventEmitter<MantenimientoImpl>();
  @Output() mantenimientoEliminar = new EventEmitter<MantenimientoImpl>();

  firstFormGroup = this._formBuilder.group({
    matricula: [''],
    fechaAlta: [''],
    marca: [''],
    modelo: [''],
    tipoVehiculo: [''],
    unidadDestino: [''],
    fechaAdjudicacion: [''],
  });

  secondFormGroup = this._formBuilder.group({
    bastidor: [''],
    color: [''],
    combustible: [''],
    cambio: [''],
    capacidadDeposito: [''],
    lubricanteMotor: [''],
    capacidadCarter: [''],
    presionNeumaticosDelanteros: [''],
    presionNeumaticosTraseros: [''],
    tipoCubiertas: [''],
    numeroBaterias: [''],
    voltajeBaterias: [''],
    amperajeBaterias: [''],
    amperiosHoraBaterias: [''],
    clasificacionMedioambiental: [''],
  });

  thirdFormGroup = this._formBuilder.group({
    condicionesUso: [''],
    observaciones: [''],
    liquidoFrenosKm: [''],
    liquidoFrenosMes: [''],
    operacionesSistematicasKm: [''],
    operacionesSistematicasMes: [''],
    filtroAireKm: [''],
    filtroAireMes: [''],
    filtroAireHabitaculoKm: [''],
    filtroAireHabitaculoMes: [''],
    filtroCombustibleKm: [''],
    filtroCombustibleMes: [''],
    filtroAntipolenKm: [''],
    filtroAntipolenMes: [''],
    correaDistribucionKm: [''],
    correaDistribucionMes: [''],
    kitDistribucionKm: [''],
    kitDistribucionMes: [''],
    reglajeProyectoresKm: [''],
    reglajeProyectoresMes: [''],
    pHLiquidoRefrigeracionKm: [''],
    pHLiquidoRefrigeracionMes: [''],
    liquidoRefrigeracionKm: [''],
    liquidoRefrigeracionMes: [''],
    correaArrastreAccesoriosKm: [''],
    correaArrastreAccesoriosMes: [''],
    kitCorreaArrastreAccesoriosKm: [''],
    kitCorreaArrastreAccesoriosMes: [''],
    anticongelanteKm: [''],
    anticongelanteMes: [''],
    aceiteTransmisionKm: [''],
    aceiteTransmisionMes: [''],
    bujiasEncendidoKm: [''],
    bujiasEncendidoMes: [''],
  });

  constructor(
    private vehiculoService: VehiculoService,
    private datosTecnicosInteresService: DatosTecnicosInteresService,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private avisokmService: AvisokmService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private mantenimientoService: MantenimientoService
  ) {}

  ngOnInit(): void {
    let id: string = this.cargarVehiculo();
    this.vehiculoService.getVehiculo(id).subscribe((response) => {
      this.vehiculo = this.vehiculoService.mapearVehiculo(response);
      this.mantenimientoService.getmantenimientoVehiculo(id).subscribe(response => {
        this.mantenimientos = this.mantenimientoService.extraerMantenimientos(response);
        this.vehiculo.mantenimientos=this.mantenimientos;
        this.datosTecnicosInteresService.getDatosTecnicosInteresVehiculo(id).subscribe(response => {
          this.datosTecnicosInteres = this.datosTecnicosInteresService.mapearDatosTecnicosInteres(response);
        this.mantenimientoPreventivoService.getPP(id).subscribe(response => {
          this.mantenimientoPreventivo = this.mantenimientoPreventivoService.mapearMantenimientoPreventivo(response);
        this.avisokmService.getAvisoKm(id).subscribe(response => {
          console.log(response);
          this.avisokm = this.avisokmService.mapearAvisokm(response)
          })
        })
      })
    })
  })
}


  cargarVehiculo(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  onEditarVehiculo(): void {
    this.vehiculo.datosTecnicosInteres = `${this.urlEndpoint}datostecnicosinteres/${this.datosTecnicosInteres.id}`;
    this.vehiculo.planespreventivos = `${this.urlEndpoint}planespreventivos/${this.mantenimientoPreventivo.id}`;
    this.vehiculo.avisokms = `${this.urlEndpoint}avisokms/${this.avisokm.id}`;
    console.log(this.avisokm.id);

    this.vehiculoService.updateVehiculo(this.vehiculo).subscribe();

    this.datosTecnicosInteresService
      .updateDatosTecnicosInteres(this.datosTecnicosInteres)
      .subscribe();

    this.mantenimientoPreventivoService
      .updateMantenimmientoPreventivo(this.mantenimientoPreventivo)
      .subscribe();

    this.avisokmService
      .updateAvisokm(this.avisokm, this.mantenimientoPreventivo, this.vehiculo.kilometrosActuales)
      .subscribe();

    this.router.navigate([`administrador/consultar/${this.vehiculo.id}`]);
  }

  verDatosVehiculo(vehiculo: Vehiculo): void {
    this.vehiculo = vehiculo;
  }

  verDatosMR(mantenimiento: MantenimientoImpl): void {
    this.mantenimientoVerDatos = mantenimiento;
  }

  onMantenimientoEditar(mantenimiento: MantenimientoImpl) {
    this.verDatosMR(mantenimiento);
    console.log(mantenimiento)
    let url = `administrador/mantenimientosrealizados/editar/${mantenimiento.id}`;
    this.router.navigate([url]);
  }

  consultarMR(): void {
    this.mantenimientoConsultar.emit(this.mantenimiento);
  }

  onMantenimientoEliminar(mantenimiento: MantenimientoImpl) {
    this.mantenimientoService.deleteMantenimiento(mantenimiento.id).subscribe();
  }

  volver= faArrowLeft;
  
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

 
}
