import { Component, OnInit } from '@angular/core';
import { PokeServiceService } from '../../services/poke-service.service';
import { Move } from '../../models/move';
import { Moves } from '../../models/moves';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-move-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './move-list.component.html',
  styleUrl: './move-list.component.css'
})
export class MoveListComponent implements OnInit {

  moves: Move[];
  displayedColumns = ['name'];
  dataSource = new MatTableDataSource<Move>();

  constructor(private pokeService: PokeServiceService) {
    this.moves = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getMoves();
    
  }

  getMoves() {
    this.pokeService.getMoves().subscribe((data: any) => {
      this.moves = data.results;
      this.dataSource.data = this.moves;
      this.dataSource.connect();
      console.log(data.results);
    })

  }
}
