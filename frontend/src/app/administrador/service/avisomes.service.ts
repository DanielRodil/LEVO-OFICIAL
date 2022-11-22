import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MantenimientoPreventivo } from 'src/app/vehiculo/models/planes-preventivos';
import { environment } from 'src/environments/environment.prod';
import { Avisomes } from '../models/avisomes';
import { AvisomesImpl } from '../models/avisomes-impl';

@Injectable({
  providedIn: 'root'
})
export class AvisomesService {

  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}avisomeses`;
  private urlEndPointPP: string = `${this.host}vehiculos`;

  constructor(private http: HttpClient) { }

  extraerAvisoMes(respuestaApi: any): Avisomes {
    let avisomes: Avisomes;
    avisomes = this.mapearAvisoMes(respuestaApi);
    return avisomes;
  }

  mapearAvisoMes(avisoMesApi: any): AvisomesImpl {
    let avisomes: Avisomes = new AvisomesImpl();
    avisomes.id = this.getId(avisoMesApi._links.avisomes.href);
    avisomes.mensajeMes = avisoMesApi.mensajeMes;
    avisomes.avisoLiquidoFrenosMes = avisoMesApi.avisoLiquidoFrenosMes ;
    avisomes.avisoOperacionesSistematicasMes = avisoMesApi.avisoOperacionesSistematicasMes;
    avisomes.avisoFiltroAireMes =  avisoMesApi.avisoFiltroAireMes;
    avisomes.avisoFiltroAireHabitaculoMes = avisoMesApi.avisoFiltroAireHabitaculoMes;
    avisomes.avisoFiltroCombustibleMes = avisoMesApi.avisoFiltroCombustibleMes;
    avisomes.avisoFiltroAntipolenMes = avisoMesApi.avisoFiltroAntipolenMes;
    avisomes.avisoCorreaDistribucionMes = avisoMesApi.avisoCorreaDistribucionMes ;
    avisomes.avisoKitDistribucionMes = avisoMesApi.avisoKitDistribucionMes;
    avisomes.avisoReglajeProyectoresMes = avisoMesApi.avisoReglajeProyectoresMes;
    avisomes.avisoPhLiquidoRefrigeracionMes = avisoMesApi.avisoPhLiquidoRefrigeracionMes;
    avisomes.avisoLiquidoRefrigeracionMes = avisoMesApi.avisoLiquidoRefrigeracionMes;
    avisomes.avisoCorreaArrastreAccesoriosMes = avisoMesApi.avisoCorreaArrastreAccesoriosMes;
    avisomes.avisoKitCorreaArrastreAccesoriosMes = avisoMesApi.avisoKitCorreaArrastreAccesoriosMes;
    avisomes.avisoAnticongelanteMes = avisoMesApi.avisoAnticongelanteMes;
    avisomes.avisoAceiteTransimisionMes = avisoMesApi.avisoAceiteTransimisionMes;
    avisomes.avisoBujiasEncendidoMes = avisoMesApi.avisoBujiasEncendidoMes;
    return avisomes;
  }

  getId(url: string): string {
    let posicionFinal: number = url.lastIndexOf("/");
    let numId: string = url.slice(posicionFinal + 1, url.length);
    return numId;
  }

  crearAvisoMes(mantenimientoPreventivo: MantenimientoPreventivo, mesesActuales: number): Observable<any> {
    let avisomes: Avisomes = new AvisomesImpl();

    avisomes.avisoLiquidoFrenosMes = mantenimientoPreventivo.liquidoFrenosMes - mesesActuales;
    avisomes.avisoOperacionesSistematicasMes = mantenimientoPreventivo.operacionesSistematicasMes - mesesActuales;
    avisomes.avisoFiltroAireMes = mantenimientoPreventivo.filtroAireMes - mesesActuales;
    avisomes.avisoFiltroAireHabitaculoMes = mantenimientoPreventivo.filtroAireHabitaculoMes - mesesActuales;
    avisomes.avisoFiltroCombustibleMes = mantenimientoPreventivo.filtroCombustibleMes - mesesActuales;
    avisomes.avisoFiltroAntipolenMes = mantenimientoPreventivo.filtroAntipolenMes - mesesActuales;
    avisomes.avisoCorreaDistribucionMes = mantenimientoPreventivo.correaDistribucionMes - mesesActuales;
    avisomes.avisoKitDistribucionMes = mantenimientoPreventivo.kitDistribucionMes - mesesActuales;
    avisomes.avisoReglajeProyectoresMes = mantenimientoPreventivo.reglajeProyectoresMes - mesesActuales;
    avisomes.avisoPhLiquidoRefrigeracionMes = mantenimientoPreventivo.pHLiquidoRefrigeracionMes - mesesActuales;
    avisomes.avisoLiquidoRefrigeracionMes = mantenimientoPreventivo.liquidoRefrigeracionMes - mesesActuales;
    avisomes.avisoCorreaArrastreAccesoriosMes = mantenimientoPreventivo.correaArrastreAccesoriosMes - mesesActuales;
    avisomes.avisoKitCorreaArrastreAccesoriosMes = mantenimientoPreventivo.kitCorreaArrastreAccesoriosMes - mesesActuales;
    avisomes.avisoAnticongelanteMes = mantenimientoPreventivo.anticongelanteMes - mesesActuales;
    avisomes.avisoAceiteTransimisionMes = mantenimientoPreventivo.aceiteTransmisionMes - mesesActuales;
    avisomes.avisoBujiasEncendidoMes = mantenimientoPreventivo.bujiasEncendidoMes - mesesActuales;

  

    return this.http.post(`${this.urlEndPoint}`, avisomes).pipe(
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

  updateAvisoMes(avisomes: Avisomes, mantenimientoPreventivo: MantenimientoPreventivo, mesesActuales: number): Observable<any> {

    avisomes.avisoLiquidoFrenosMes = mantenimientoPreventivo.liquidoFrenosMes - mesesActuales;
    avisomes.avisoOperacionesSistematicasMes = mantenimientoPreventivo.operacionesSistematicasMes - mesesActuales;
    avisomes.avisoFiltroAireMes = mantenimientoPreventivo.filtroAireMes - mesesActuales;
    avisomes.avisoFiltroAireHabitaculoMes = mantenimientoPreventivo.filtroAireHabitaculoMes - mesesActuales;
    avisomes.avisoFiltroCombustibleMes = mantenimientoPreventivo.filtroCombustibleMes - mesesActuales;
    avisomes.avisoFiltroAntipolenMes = mantenimientoPreventivo.filtroAntipolenMes - mesesActuales;
    avisomes.avisoCorreaDistribucionMes = mantenimientoPreventivo.correaDistribucionMes - mesesActuales;
    avisomes.avisoKitDistribucionMes = mantenimientoPreventivo.kitDistribucionMes - mesesActuales;
    avisomes.avisoReglajeProyectoresMes = mantenimientoPreventivo.reglajeProyectoresMes - mesesActuales;
    avisomes.avisoPhLiquidoRefrigeracionMes = mantenimientoPreventivo.pHLiquidoRefrigeracionMes - mesesActuales;
    avisomes.avisoLiquidoRefrigeracionMes = mantenimientoPreventivo.liquidoRefrigeracionMes - mesesActuales;
    avisomes.avisoCorreaArrastreAccesoriosMes = mantenimientoPreventivo.correaArrastreAccesoriosMes - mesesActuales;
    avisomes.avisoKitCorreaArrastreAccesoriosMes = mantenimientoPreventivo.kitCorreaArrastreAccesoriosMes - mesesActuales;
    avisomes.avisoAnticongelanteMes = mantenimientoPreventivo.anticongelanteMes - mesesActuales;
    avisomes.avisoAceiteTransimisionMes = mantenimientoPreventivo.aceiteTransmisionMes - mesesActuales;
    avisomes.avisoBujiasEncendidoMes = mantenimientoPreventivo.bujiasEncendidoMes - mesesActuales;
    avisomes.mensajeMes = "";

    return this.http
      .patch<any>(`${this.urlEndPoint}/${avisomes.id}`, avisomes)
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

  getAvisoMes(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPointPP}/${id}/avisomes`);
  }

  getAvisoMesBusqueda(id: string): Observable<any> {
    
    return this.http.get<any>(id);
  }

}
