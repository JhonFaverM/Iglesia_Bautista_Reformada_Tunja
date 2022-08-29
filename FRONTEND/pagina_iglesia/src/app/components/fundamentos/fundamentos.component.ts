import { Component, OnInit } from '@angular/core';
import { Files } from 'src/app/models/files';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-fundamentos',
  templateUrl: './fundamentos.component.html',
  styleUrls: ['./fundamentos.component.css']
})
export class FundamentosComponent implements OnInit {

  files: Files[] = []; //llamar interfarces del model

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.fileService.getFile();
    this.fileService.getFilesStream().subscribe((files: Files[])=>{
      this.files = files;
      console.log(this.files);
    });
  }

}

/*
form!: FormGroup;
inmueble!: Inmuebles; //models 
images!: FileList;

constructor(private inmuebleService: InmuebleService) { }

//ngOnInit se inicializa las vistas del template o html
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
createInmueble(){
  this.inmuebleService.postInmueble(this.form.value.idAparment, this.form.value.ubicacion, this.images);       //asi se accede a los atributos de los formularios
  this.form.reset();
}

*/
