import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as bodyParser from 'body-parser';
import { Observable, Subject } from 'rxjs';
import { Files } from '../models/files';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  readonly url = "http://localhost:2500/api/images/";
  imagenes: Files[] = [];
  files$ = new Subject<Files[]>();

  constructor(private http: HttpClient) { }

  getFile(){
    this.http.get<Files[]>(this.url).subscribe((data)=>{
      this.imagenes = data;
      this.files$.next(this.imagenes);
    })
  }

  getFilesStream(){
    return this.files$.asObservable()
  }

  postFile(idAparment: string, images: FileList){     //metodo para grabar en postman y envbia al backend
    const file = new FormData();      //objeto que nos enlista los artibutos a la base datos
    file.append("idAparment", idAparment,  );      //metodo ´para adjuntar archivos append
    for(let i=0; i<images.length; i++){
      console.log(images[i])
      file.append("images",images[i], );     //con el for podemos enviar imagen por imagen
    }

    this.http.post<Files>(this.url+"multiple", file).subscribe((response: Files)=>{
      const file: Files = {
        _id:response._id,
        idAparment:response.idAparment,
        imageRutas:response.imageRutas
      }
      this.imagenes.push(file);
      this.files$.next(this.imagenes);    //actualiza la vista 
    })
  }

}
