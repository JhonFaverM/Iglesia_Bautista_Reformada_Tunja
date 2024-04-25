import { Component, OnInit } from '@angular/core';
import { Miembros } from 'src/app/models/miembros';
import { MiembrosService } from'src/app/services/miembros.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';




@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styleUrls: ['./miembros.component.css']
})
export class MiembrosComponent implements OnInit {
  displayedColumns: string[] = ['nombre_completo', 'estado', 'telefono', 'direccion'];
  //dataSource = new MatTableDataSource<Miembros>([]);

 

  miembros: Miembros[] = [];
  contadorFilas: number = 1;
  miembrosMostrar: any[] = [];

  selectedMiembro: any;
  allMiembros: any;


  getAllMiembros(){
    this.miembroService.getAllMiembros().subscribe((miembros: Miembros[])=>{
      this.allMiembros = miembros
    })
  }


  constructor(private miembroService: MiembrosService) { }

  ngOnInit(): void {
    this.miembroService.getMiembro();//llama al metodo getLibro del servicio
    this.miembroService.getMiembrosStream().subscribe((miembros: Miembros[]) => {
      this.miembros = miembros.map(miembro => ({ ...miembro, mostrarCompleto: false }));
      //this.dataSource.data = miembros;
    });
  }


}
