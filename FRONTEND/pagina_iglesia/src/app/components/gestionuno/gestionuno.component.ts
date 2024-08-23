import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Libros } from 'src/app/models/libros';
import { LibroService } from 'src/app/services/libro.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gestionuno',
  templateUrl: './gestionuno.component.html',
  styleUrls: ['./gestionuno.component.css']
})
export class GestionunoComponent implements OnInit {

  allLibros: Libros[] = [];
  pdf!: FormGroup;
  images!: FileList;

  constructor(
    private libroService: LibroService,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.pdf = new FormGroup({ 
      nameBook: new FormControl(null),
      article: new FormControl(null),
      images: new FormControl(null)
    });

    this.getAllLibros();  // Cargar los libros al iniciar el componente
  }

  getAllLibros(): void {
    this.libroService.getAllLibros().subscribe({
      next: (libros: Libros[]) => this.allLibros = libros,
      error: () => this._snackBar.open('Error al cargar los libros', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    });
  }

  onChangeInput(event: Event): void {
    this.images = (event.target as HTMLInputElement).files as FileList;
  }

  createLibro(): void {
    this.libroService.postLibro(this.pdf.value.nameBook, this.pdf.value.article, this.images)
      .subscribe({
        next: (response: Libros) => {
          this.allLibros.push(response);
          this._snackBar.open('Creaste un nuevo Artículo', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        error: () => {
          this._snackBar.open('Error al crear el artículo', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });

    this.pdf.reset();
  }
}
