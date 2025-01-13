import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Make } from '@models/make';
import { MakeModel } from '@models/make-model';
import { MakeType } from '@models/make-type';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { ServiceUtils } from './service-utils';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private static readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api';
  private static readonly API = {
    GET_ALL_MAKES: '/vehicles/GetAllMakes?format=json',
    GET_TYPES_BY_MAKE_ID: '/vehicles/GetVehicleTypesForMakeId/{0}?format=json',
    GET_MODELS_BY_MAKE_ID: '/vehicles/GetModelsForMakeId/{0}?format=json',
  };
  private http = inject(HttpClient);

  getAllMakes(): Observable<Response<Make[]>> {
    return this.http.get<Response<Make[]>>(`${VehiclesService.baseUrl}${VehiclesService.API.GET_ALL_MAKES}`);
  }

  getTypesByMakeId(makeId: number): Observable<Response<MakeType[]>> {
    const apiUrl = ServiceUtils.format(VehiclesService.API.GET_TYPES_BY_MAKE_ID, makeId.toString());
    const url = VehiclesService.baseUrl + apiUrl;
    return this.http.get<Response<any>>(url);
  }

  getModelsByMakeId(makeId: number): Observable<Response<MakeModel[]>> {
    const apiUrl = ServiceUtils.format(VehiclesService.API.GET_MODELS_BY_MAKE_ID, makeId.toString());
    const url = VehiclesService.baseUrl + apiUrl;
    return this.http.get<Response<any>>(url);
  }

}
