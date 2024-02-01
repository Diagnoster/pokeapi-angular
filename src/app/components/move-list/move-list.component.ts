import { Component, OnInit } from '@angular/core';
import { PokeServiceService } from '../../services/poke-service.service';
import { Move } from '../../models/move';
import { Moves } from '../../models/moves';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MoveDetails } from '../../models/move-details';

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
  moveDetailsList: MoveDetails [];
  displayedColumns = ['id', 'name'];
  dataSource = new MatTableDataSource<MoveDetails>();

  constructor(private pokeService: PokeServiceService) {
    this.moves = [];
    this.moveDetailsList = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getMoves();
    
  }

  getMoves() {
    this.pokeService.getAllMoves().subscribe((data: any) => {
      this.moves = data.results;
      this.moves.forEach( move => {
        this.pokeService.getPokeMoves(move.url).subscribe((data:any) => {
          this.moveDetailsList.push(data);
        });
      })
      this.dataSource.data = this.moveDetailsList;
      this.dataSource.connect();
    })


  }
}
