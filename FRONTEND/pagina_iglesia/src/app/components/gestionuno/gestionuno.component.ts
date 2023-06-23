import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Libros } from 'src/app/models/libros';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-gestionuno',
  templateUrl: './gestionuno.component.html',
  styleUrls: ['./gestionuno.component.css']
})
export class GestionunoComponent implements OnInit {

  allLibros: any;
  libros: Libros[] = []; //llamar interfarces del model


  getAllLibros(){
    this.libroService.getAllLibros().subscribe((libros: Libros[])=>{
      this.allLibros = libros
    }) 
    
  }

  pdf!:FormGroup;
  libro!: Libros;
  images!: FileList;
  
  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.pdf = new FormGroup({     //inicializar el formulario en cero
      nameBook: new FormControl(null),  //permite manipular los input
      images: new FormControl(null)
    })
  }
 


  onChangeInput(event: Event){      //el event trae toda la informacion que contiene el elemento
    this.images = (event.target as HTMLInputElement).files as FileList     //asi se captura el elememt file, crear variable images

  }

  
  createLibro(){
    this.libroService.postLibro(this.pdf.value.nameBook, this.images);       //asi se accede a los atributos de los formularios
    this.pdf.reset();
  }
}
