import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/models/libros';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-fundamentos',
  templateUrl: './fundamentos.component.html',
  styleUrls: ['./fundamentos.component.css']
})
export class FundamentosComponent implements OnInit {

  libros: Libros[] = [];
  librosMostrar: any[] = [];
  selectedLibro: any;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  allLibros: any[] = [];
  busqueda: string = '';

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.libroService.getLibro();
    this.currentPage = 1;

    this.libroService.getLibrosStream().subscribe((libros: Libros[]) => {
      this.libros = libros.map(libro => ({ ...libro, mostrarCompleto: false, mostrarOverlay: false }));
      this.updateLibros();
    });
  }

  get pages(): number[] {
    return Array.from({ length: Math.ceil(this.libros.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 1), this.pages.length);
    this.updateLibros();
  }

  updateLibros(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.librosMostrar = this.libros.slice(startIndex, startIndex + this.itemsPerPage);
  }

  mostrarArticuloCompleto(libro: any): void {
    this.selectedLibro = libro;
    this.selectedLibro.mostrarCompleto = true;
  }

  cerrarModal(): void {
    if (this.selectedLibro) {
      this.selectedLibro.mostrarCompleto = false;
      this.selectedLibro = null;
    }
  }

  buscarLibro(): void {
    console.log('Búsqueda:', this.busqueda);
  }

  limpiarInput(): void {
    this.busqueda = '';
  }
}
