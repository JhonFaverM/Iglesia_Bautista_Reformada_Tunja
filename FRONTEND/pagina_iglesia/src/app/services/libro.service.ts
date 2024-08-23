import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Libros } from '../models/libros';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private readonly url = "https://iglesia-bautista-reformada-tunja-2.onrender.com/api/libros/";
  private libros$ = new Subject<Libros[]>();
  imagenes: Libros[] = [];


  constructor(private http: HttpClient) { }

  getAllLibros(): Observable<Libros[]> {
    return this.http.get<Libros[]>(this.url);
  }

  paginationLibros(): Observable<any> {
    const paginationUrl = `${this.url}pagination`;
    return this.http.get(paginationUrl);
  }

  deleteArticulo(nameBook: string): Observable<void> {
    const deleteUrl = `${this.url}nameBook/${nameBook}`;
    return this.http.delete<void>(deleteUrl);
  }

  getLibro() {
    this.getAllLibros().subscribe((data) => {
      this.libros$.next(data);
    });
  }

  getLibrosStream(): Observable<Libros[]> {
    return this.libros$.asObservable();
  }

  //metodo para crear libro en gestionUno
  postLibro(nameBook: string, article: string, images: FileList): Observable<Libros> {
    const formData = new FormData();
    formData.append("nameBook", nameBook);
    formData.append("article", article);
    
    for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
    }

    return this.http.post<Libros>(this.url + "multiple", formData).pipe(
        tap((response: Libros) => {
            const newLibro: Libros = {
                _id: response._id,
                nameBook: response.nameBook,
                article: response.article,
                bookRutas: response.bookRutas,
                mostrarCompleto: false
            };

            this.imagenes.push(newLibro);
            this.libros$.next(this.imagenes);
        })
    );
  }

}

