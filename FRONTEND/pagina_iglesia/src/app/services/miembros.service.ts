import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Miembros } from '../models/miembros';

@Injectable({
  providedIn: 'root'
})
export class MiembrosService {

  readonly url = 'http://localhost:2500/api/miembros';
  miembros: Miembros[] = [];
  miembros$ = new Subject<Miembros[]>();
  httpClient: any;


  constructor(private http: HttpClient) { }

  getAllMiembros(){
    return this.httpClient.get("http://localhost:2500/api/miembros");
  }

  //Solicitud que trae los libros y los pasa a fundamentos
  getMiembro(){
    this.http.get<Miembros[]>(this.url).subscribe((data)=>{
      this.miembros = data;
      this.miembros$.next(this.miembros);
    })
  }

  getMiembrosStream(): Observable<Miembros[]> {
    return this.miembros$.asObservable();
  }


}
