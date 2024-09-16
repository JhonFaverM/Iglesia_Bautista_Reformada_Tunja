import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Libros } from 'src/app/models/libros';
import { LibroService } from 'src/app/services/libro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionuno',
  templateUrl: './gestionuno.component.html',
  styleUrls: ['./gestionuno.component.css']
})
export class GestionunoComponent implements OnInit {

  allLibros: Libros[] = [];
  pdf!: FormGroup;
  images: FileList | null = null;

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
    const nameBook = this.pdf.value.nameBook;
    const article = this.pdf.value.article;

    // Verificar que no haya null antes de continuar
    if (this.pdf.valid && nameBook && article && this.images && this.images.length > 0) {
      this.libroService.postLibro(nameBook, article, this.images)
        .subscribe({
          next: (response: Libros) => {
            this.allLibros.push(response);
            Swal.fire({
              title: 'Éxitoso!!',
              text: 'Creaste un nuevo Artículo',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.pdf.reset();
            this.images = null;  // Resetear imágenes después de enviar
          },
          error: () => Swal.fire({
            title: 'Error!!',
            text: 'Error al crear el Artículo',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        });
    } else {
      Swal.fire({
        title: 'Error!!',
        text: 'Por favor, completa todos los campos y selecciona una imagen.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  
}
