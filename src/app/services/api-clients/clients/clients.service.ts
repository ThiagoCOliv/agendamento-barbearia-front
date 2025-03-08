import { Injectable } from '@angular/core';
import { IClientService } from './iclients.service';
import { Observable } from 'rxjs';
import { SaveClientRequest, SaveClientResponse, UpdateClientRequest, UpdateClientResponse, ListClientResponse, DetailClientResponse } from './client.models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService implements IClientService
{
  private readonly baseURL: string = enviroment.apiURL;

  constructor(private http: HttpClient) { }

  save(request: SaveClientRequest): Observable<SaveClientResponse> 
  {
    return this.http.post<SaveClientResponse>(`${this.baseURL}clients`, request)
  }

  update(id: number, request: UpdateClientRequest): Observable<UpdateClientResponse> 
  {
    return this.http.put<UpdateClientResponse>(`${this.baseURL}clients/${id}`, request)
  }

  delete(id: number): Observable<void> 
  {
    return this.http.delete<void>(`${this.baseURL}clients/${id}`)
  }

  list(): Observable<ListClientResponse[]> 
  {
    return this.http.get<ListClientResponse[]>(`${this.baseURL}clients`)
  }

  findById(id: number): Observable<DetailClientResponse> 
  {
    return this.http.get<DetailClientResponse>(`${this.baseURL}clients/${id}`)
  }
}