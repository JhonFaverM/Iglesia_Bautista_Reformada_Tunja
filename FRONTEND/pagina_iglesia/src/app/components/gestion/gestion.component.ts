import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { send } from 'process';
import { Files } from 'src/app/models/files';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  form!: FormGroup;
  file!: Files; //models 
  images!: FileList;

  private fileTmp:any;
  
  constructor(private fileService: FileService, ) { }

  ngOnInit(): void {
    this.form = new FormGroup({     //inicializar el formulario en cero
      idAparment: new FormControl(null),  //permite manipular los input
      ubicacion: new FormControl(null),
      images: new FormControl(null)
    })
  }

  onChangeInput(event: Event){      //el event trae toda la informacion que contiene el elemento
    this.images = (event.target as HTMLInputElement).files as FileList     //asi se captura el elememt file, crear variable images

  }

  //se debe usar un servicio para enviar las images
  createFile(){
    this.fileService.postFile(this.form.value.idAparment, this.form.value.ubicacion, this.images);       //asi se accede a los atributos de los formularios
    this.form.reset();
  }


  
  

}
