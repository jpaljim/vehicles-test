import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Make } from '@models/make';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private static readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api';
  private static readonly API = {
    GET_ALL_MAKES: '/vehicles/GetAllMakes?format=json',
  };
  private http = inject(HttpClient);

  getAllMakes(): Observable<Response<Make[]>> {
    return this.http.get<Response<Make[]>>(`${VehiclesService.baseUrl}${VehiclesService.API.GET_ALL_MAKES}`);
  }

}
