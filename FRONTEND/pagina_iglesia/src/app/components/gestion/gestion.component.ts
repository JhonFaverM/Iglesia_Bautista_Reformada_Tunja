import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Files } from 'src/app/models/files';
import { Libros } from 'src/app/models/libros';
import { FileService } from 'src/app/services/file.service';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  //borrador


  allLibros: any;

  libros: Libros[] = []; //llamar interfarces del model


  

  getAllLibros(){
    this.libroService.getAllLibros().subscribe((libros: Libros[])=>{
      this.allLibros = libros
    }) 
    
  }

  //fin de borrador

  form!: FormGroup;
  file!: Files; //models 
  images!: FileList;

  // PDF
  book!: FormGroup;
  libro!: Libros;
  libroService!: LibroService;
  pdf!:FormGroup;
  //libroService!: LibroService

  
  constructor(private fileService: FileService, libroService: LibroService) { 
    
  }

  ngOnInit(): void {
    this.form = new FormGroup({     //inicializar el formulario en cero
      idAparment: new FormControl(null),  //permite manipular los input
      images: new FormControl(null)
    }) 
  }

  onChangeInput(event: Event){      //el event trae toda la informacion que contiene el elemento
    this.images = (event.target as HTMLInputElement).files as FileList     //asi se captura el elememt file, crear variable images
    //this.images = (event.target as HTMLInputElement).files as FileList

  }

  
  //se debe usar un servicio para enviar las images
  
  createFile(){
    this.fileService.postFile(this.form.value.idAparment, this.images);       //asi se accede a los atributos de los formularios
    this.form.reset();
  }
}



/* 
constructor(private fileService: FileService, libroService: LibroService) { 
    
  }

  ngOnInit(): void {
    this.form = new FormGroup({     //inicializar el formulario en cero
      idAparment: new FormControl(null),  //permite manipular los input
      images: new FormControl(null)
    }),

    this.book = new FormGroup({     //inicializar el formulario en cero
      nameBook: new FormControl(null),  //permite manipular los input
      images: new FormControl(null)
    })
    //borrador
    //this.libroService.getLibro();
  
    ;
    //fin de borrador
  }

  onChangeInput(event: Event){      //el event trae toda la informacion que contiene el elemento
    this.images = (event.target as HTMLInputElement).files as FileList     //asi se captura el elememt file, crear variable images
    //this.images = (event.target as HTMLInputElement).files as FileList

  }

  
  //se debe usar un servicio para enviar las images
  
  createFile(){
    this.fileService.postFile(this.form.value.idAparment, this.images);       //asi se accede a los atributos de los formularios
    this.form.reset();
  }
  

  createLibro(){
    this.libroService.postLibro(this.book.value.nameBook, this.images);       //asi se accede a los atributos de los formularios
    this.book.reset();
  }

*/
