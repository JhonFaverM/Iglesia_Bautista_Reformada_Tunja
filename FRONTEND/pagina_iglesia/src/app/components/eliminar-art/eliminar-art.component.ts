import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/models/libros';
import { LibroService } from 'src/app/services/libro.service';
import { MatDialog } from '@angular/material/dialog';
//import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowModalComponent } from '../show-modal/show-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-art',
  templateUrl: './eliminar-art.component.html',
  styleUrls: ['./eliminar-art.component.css']
})
export class EliminarArtComponent implements OnInit {

  libro: any = {
    bookRutas: "",
    nameBook: "",
    article: ""
  }

  libros: Libros[] = []; //llamar interfarces del model
  librosMostrar: any[] = [];

  selectedLibro: any;
  allLibros: Libros[] = [];
  article: any;

  constructor(
    private libroService: LibroService,
    private dialog:MatDialog,
    private _snackBar: MatSnackBar
  ) { } //suscripcion al servicio

  

  getAllLibros(){
    this.libroService.getAllLibros().subscribe((libros: Libros[])=>{
      this.allLibros = libros
    })
  }

   
ngOnInit(): void {
  this.libroService.getLibro();//llama al metodo getLibro del servicio
  this.libroService.getLibrosStream().subscribe((libros: Libros[]) => {
    this.libros = libros.map(libro => ({ ...libro, mostrarCompleto: false }));
    console.log(this.libros);
  });
} 


  mostrarArticuloCompleto(libro: any) {
    libro.mostrarCompleto = true;
    const dialogRef = this.dialog.open(ShowModalComponent, {
      data: {
        bookRutas: libro.bookRutas,
        nameBook: libro.nameBook,
        article: libro.article,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      libro.mostrarCompleto = false;
    });
  }

  confirmDelete(libro: Libros) {
    const dialogRef = this.dialog.open(ShowModalComponent, {
      data: {
        message: `¿Está seguro de que desea eliminar el libro "${libro.nameBook}"?`
      }
    });
    // Maneja la respuesta después de cerrar el modal
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteArticulo(libro);
      }
    });
  }

  deleteArticulo(libro: Libros) {
    this.libroService.deleteArticulo(libro.nameBook).subscribe({
      next: () => {
        this.libros = this.libros.filter(item => item.nameBook !== libro.nameBook);
        this._snackBar.open('Artículo eliminado', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      },
      error: (err) => {
        console.error('Error al eliminar el libro:', err);
        this._snackBar.open('Error al eliminar el artículo', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }
  

}
