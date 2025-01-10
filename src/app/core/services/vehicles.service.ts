import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Make } from '../models/make';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private static readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api';
  private static readonly API = {
    GET_ALL_MAKES: '/vehicles/GetAllMakes?format=json',
  };
  private http = inject(HttpClient);

  getAllMakes(): Observable<Make[]> {
    return this.http.get<Make[]>(`${VehiclesService.baseUrl}${VehiclesService.API.GET_ALL_MAKES}`);
  }

}
