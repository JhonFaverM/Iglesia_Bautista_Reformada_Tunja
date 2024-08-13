import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Libros } from '../models/libros';



@Injectable({
  providedIn: 'root'
})
export class LibroService {

  readonly url = "http://localhost:2500/api/libros/";
  imagenes: Libros[] = [];
  libros$ = new Subject<Libros[]>();

  constructor(private http: HttpClient) {
  }

  getAllLibros(): Observable<Libros[]>{
    return this.http.get<Libros[]>(this.url);
  }

paginationLibros(){
  return this.http.get("http://localhost:2500/api/pagination")
}

deleteArticulo(nameBook: string): Observable<void> {
  const deleteUrl = `${this.url}nameBook/${nameBook}`;
  return this.http.delete<void>(deleteUrl);
}

  
  //Solicitud que trae los libros y los pasa a fundamentos
  getLibro(){
    this.http.get<Libros[]>(this.url).subscribe((data)=>{
      this.imagenes = data;
      this.libros$.next(this.imagenes);
    })
  }

  getLibrosStream(): Observable<Libros[]> {
    return this.libros$.asObservable();
  }

//metodo para crear libro en gestionUno
  postLibro(nameBook: string, article:string, images: FileList){     //metodo para grabar en postman y envbia al backend
    const libro = new FormData();     //objeto que nos enlista los artibutos a la base datos
    libro.append("nameBook", nameBook);      //metodo ´para adjuntar archivos append
    libro.append("article", article);
    for(let i=0; i<images.length; i++){
      console.log(images[i])
      libro.append("images",images[i]);     //con el for podemos enviar imagen por imagen
    }

    this.http.post<Libros>(this.url+"multiple", libro).subscribe((response: Libros)=>{
      const libro: Libros = {
        _id:response._id,
        nameBook:response.nameBook,
        article:response.article,
        bookRutas:response.bookRutas,  
        mostrarCompleto: false
      }
      this.imagenes.push(libro);
      this.libros$.next(this.imagenes);    //actualiza la vista 
    })
  }

}

