import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MantenimientoPreventivo } from 'src/app/vehiculo/models/planes-preventivos';
import { environment } from 'src/environments/environment.prod';
import { Avisokm } from '../models/avisokm';
import { AvisokmImpl } from '../models/avisokm-impl';

@Injectable({
  providedIn: 'root'
})
export class AvisokmService {

  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}avisokms`;
  private urlEndPointPP: string = `${this.host}vehiculos`;


  constructor(private http: HttpClient) { }

  extraerAvisoKm(respuestaApi: any): Avisokm {
    let avisokm: Avisokm;
    avisokm = this.mapearAvisokm(respuestaApi);
    return avisokm;
  }

  mapearAvisokm(avisoKmApi: any): AvisokmImpl {
    let avisokm: Avisokm = new AvisokmImpl();
    avisokm.id = this.getId(avisoKmApi._links.avisokm.href);
    avisokm.mensajeKm = avisoKmApi.mensajeKm;
    avisokm.avisoLiquidoFrenosKm = avisoKmApi.avisoLiquidoFrenosKm ;
    avisokm.avisoOperacionesSistematicasKm = avisoKmApi.avisoOperacionesSistematicasKm;
    avisokm.avisoFiltroAireKm =  avisoKmApi.avisoFiltroAireKm;
    avisokm.avisoFiltroAireHabitaculoKm = avisoKmApi.avisoFiltroAireHabitaculoKm;
    avisokm.avisoFiltroAntipolenKm = avisoKmApi.avisoFiltroAntipolenKm;
    avisokm.avisoCorreaDistribucionKm = avisoKmApi.avisoCorreaDistribucionKm ;
    avisokm.avisoKitDistribucionKm = avisoKmApi.avisoKitDistribucionKm;
    avisokm.avisoReglajeProyectoresKm = avisoKmApi.avisoReglajeProyectoresKm;
    avisokm.avisoPhLiquidoRefrigeracionKm = avisoKmApi.avisoPhLiquidoRefrigeracionKm;
    avisokm.avisoLiquidoRefrigeracionKm = avisoKmApi.avisoLiquidoRefrigeracionKm;
    avisokm.avisoCorreaArrastreAccesoriosKm = avisoKmApi.avisoCorreaArrastreAccesoriosKm;
    avisokm.avisoKitCorreaArrastreAccesoriosKm = avisoKmApi.avisoKitCorreaArrastreAccesoriosKm;
    avisokm.avisoAnticongelanteKm = avisoKmApi.avisoAnticongelanteKm;
    avisokm.avisoAceiteTransimisionKm = avisoKmApi.avisoAceiteTransimisionKm;
    avisokm.avisoBujiasEncendidoKm = avisoKmApi.avisoBujiasEncendidoKm;
    return avisokm;
  }

  getId(url: string): string {
    let posicionFinal: number = url.lastIndexOf("/");
    let numId: string = url.slice(posicionFinal + 1, url.length);
    return numId;
  }

  crearAvisoKm(mantenimientoPreventivo: MantenimientoPreventivo, kilometrosActuales: number): Observable<any> {
    let avisokm: Avisokm = new AvisokmImpl();
    console.log(mantenimientoPreventivo);

    avisokm.avisoLiquidoFrenosKm = mantenimientoPreventivo.liquidoFrenosKm - kilometrosActuales;
    avisokm.avisoOperacionesSistematicasKm = mantenimientoPreventivo.operacionesSistematicasKm - kilometrosActuales;
    avisokm.avisoFiltroAireKm = mantenimientoPreventivo.filtroAireKm - kilometrosActuales;
    avisokm.avisoFiltroAireHabitaculoKm = mantenimientoPreventivo.filtroAireHabitaculoKm - kilometrosActuales;
    avisokm.avisoFiltroAntipolenKm = mantenimientoPreventivo.filtroAntipolenKm - kilometrosActuales;
    avisokm.avisoCorreaDistribucionKm = mantenimientoPreventivo.correaDistribucionKm - kilometrosActuales;
    avisokm.avisoKitDistribucionKm = mantenimientoPreventivo.kitDistribucionKm - kilometrosActuales;
    avisokm.avisoReglajeProyectoresKm = mantenimientoPreventivo.reglajeProyectoresKm - kilometrosActuales;
    avisokm.avisoPhLiquidoRefrigeracionKm = mantenimientoPreventivo.pHLiquidoRefrigeracionKm - kilometrosActuales;
    avisokm.avisoLiquidoRefrigeracionKm = mantenimientoPreventivo.liquidoRefrigeracionKm - kilometrosActuales;
    avisokm.avisoCorreaArrastreAccesoriosKm = mantenimientoPreventivo.correaArrastreAccesoriosKm - kilometrosActuales;
    avisokm.avisoKitCorreaArrastreAccesoriosKm = mantenimientoPreventivo.kitCorreaArrastreAccesoriosKm - kilometrosActuales;
    avisokm.avisoAnticongelanteKm = mantenimientoPreventivo.anticongelanteKm - kilometrosActuales;
    avisokm.avisoAceiteTransimisionKm = mantenimientoPreventivo.aceiteTransmisionKm - kilometrosActuales;
    avisokm.avisoBujiasEncendidoKm = mantenimientoPreventivo.bujiasEncendidoKm - kilometrosActuales;

    console.log(avisokm);

    return this.http.post(`${this.urlEndPoint}`, avisokm).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(() => new Error(e));
        }
        if (e.roor.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(() => new Error(e));
      })
    );
  }

  updateAvisokm(avisokm: Avisokm,mantenimientoPreventivo: MantenimientoPreventivo, kilometrosActuales: number): Observable<any> {

    avisokm.avisoLiquidoFrenosKm = mantenimientoPreventivo.liquidoFrenosKm - kilometrosActuales;
    avisokm.avisoOperacionesSistematicasKm = mantenimientoPreventivo.operacionesSistematicasKm - kilometrosActuales;
    avisokm.avisoFiltroAireKm = mantenimientoPreventivo.filtroAireKm - kilometrosActuales;
    avisokm.avisoFiltroAireHabitaculoKm = mantenimientoPreventivo.filtroAireHabitaculoKm - kilometrosActuales;
    avisokm.avisoFiltroAntipolenKm = mantenimientoPreventivo.filtroAntipolenKm - kilometrosActuales;
    avisokm.avisoCorreaDistribucionKm = mantenimientoPreventivo.correaDistribucionKm - kilometrosActuales;
    avisokm.avisoKitDistribucionKm = mantenimientoPreventivo.kitDistribucionKm - kilometrosActuales;
    avisokm.avisoReglajeProyectoresKm = mantenimientoPreventivo.reglajeProyectoresKm - kilometrosActuales;
    avisokm.avisoPhLiquidoRefrigeracionKm = mantenimientoPreventivo.pHLiquidoRefrigeracionKm - kilometrosActuales;
    avisokm.avisoLiquidoRefrigeracionKm = mantenimientoPreventivo.liquidoRefrigeracionKm - kilometrosActuales;
    avisokm.avisoCorreaArrastreAccesoriosKm = mantenimientoPreventivo.correaArrastreAccesoriosKm - kilometrosActuales;
    avisokm.avisoKitCorreaArrastreAccesoriosKm = mantenimientoPreventivo.kitCorreaArrastreAccesoriosKm - kilometrosActuales;
    avisokm.avisoAnticongelanteKm = mantenimientoPreventivo.anticongelanteKm - kilometrosActuales;
    avisokm.avisoAceiteTransimisionKm = mantenimientoPreventivo.aceiteTransmisionKm - kilometrosActuales;
    avisokm.avisoBujiasEncendidoKm = mantenimientoPreventivo.bujiasEncendidoKm - kilometrosActuales;
    avisokm.mensajeKm = "";

    return this.http
      .patch<any>(`${this.urlEndPoint}/${avisokm.id}`, avisokm)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(() => new Error(e));
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(() => new Error(e));
        })
      );
  }

  getAvisoKm(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPointPP}/${id}/avisokms`);
  }

  getAvisoKmBusqueda(id: string): Observable<any> {
    console.log(id);
    return this.http.get<any>(id);
  }


}
