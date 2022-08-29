import { Component, OnInit } from '@angular/core';
import { Files } from 'src/app/models/files';
import { FileService } from 'src/app/services/file.service';



@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

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

