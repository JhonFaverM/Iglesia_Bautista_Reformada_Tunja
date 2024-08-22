import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Miembros } from '../models/miembros';

@Injectable({
  providedIn: 'root'
})
export class MiembrosService {

  readonly url = 'https://iglesia-bautista-reformada-tunja-2.onrender.com/api/miembros';
  miembros: Miembros[] = [];
  miembros$ = new Subject<Miembros[]>();
  httpClient: any;


  constructor(private http: HttpClient) { }

  getAllMiembros(){
    return this.httpClient.get("https://iglesia-bautista-reformada-tunja-2.onrender.com/api/miembros");
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
