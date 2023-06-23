import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/models/libros';
import { LibroService } from 'src/app/services/libro.service';


@Component({
  selector: 'app-fundamentos',
  templateUrl: './fundamentos.component.html',
  styleUrls: ['./fundamentos.component.css']
})
export class FundamentosComponent implements OnInit {

  allLibros: any;

  libros: Libros[] = []; //llamar interfarces del model

 

  constructor(private libroService: LibroService) { } //suscripcion al servicio

  ngOnInit(): void {
    this.libroService.getLibro();
    this.libroService.getLibrosStream().subscribe((libros: Libros[])=>{
      this.libros = libros;
      console.log(this.libros);
    });
  }
  
  getAllLibros(){
    this.libroService.getAllLibros().subscribe((libros: Libros[])=>{
      this.allLibros = libros
    }) 
    
  }

  pagination(){
    this.libroService.getAllLibros().subscribe((libros: Libros[])=>{
      this.allLibros = libros;
      console.log(this.libros)
      console.log("desde pagination")
    })
   
  }
  

}

/*
  
  <div [formGroup]="myGroup">
    <input formControlName="firstName">
  </div>

  In your class:

  this.myGroup = new FormGroup({
      firstName: new FormControl()
  });
*/
