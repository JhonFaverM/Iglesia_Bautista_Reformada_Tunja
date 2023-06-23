import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Libros } from '../models/files';



@Injectable({
  providedIn: 'root'
})
export class LibroService {

  readonly url = "http://localhost:2500/api/libros/";
  imagenes: Libros[] = [];
  libros$ = new Subject<Libros[]>();
  httpClient: any;

  constructor(private http: HttpClient) {
  }

  pagination(){
    return this.httpClient.get("http://localhost:2500/api/libros/")
  }

  getAllLibros(){
    return this.httpClient.get("http://localhost:2500/api/libros/")
  }
  getLibro(){
    this.http.get<Libros[]>(this.url).subscribe((data)=>{
      this.imagenes = data;
      this.libros$.next(this.imagenes);
    })
  }

  getLibrosStream(){
    return this.libros$.asObservable()
  }

  postLibro(nameBook: string, images: FileList){     //metodo para grabar en postman y envbia al backend
    const libro = new FormData();      //objeto que nos enlista los artibutos a la base datos
    libro.append("nameBook", nameBook,  );      //metodo ´para adjuntar archivos append
    for(let i=0; i<images.length; i++){
      console.log(images[i])
      libro.append("images",images[i], );     //con el for podemos enviar imagen por imagen
    }

    this.http.post<Libros>(this.url+"multiple", libro).subscribe((response: Libros)=>{
      const libro: Libros = {
        _id:response._id,
        nameBook:response.nameBook,
        bookRutas:response.bookRutas
      }
      this.imagenes.push(libro);
      this.libros$.next(this.imagenes);    //actualiza la vista 
    })
  }

}
