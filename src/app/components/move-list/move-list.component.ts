import { Component, OnInit } from '@angular/core';
import { PokeServiceService } from '../../services/poke-service.service';
import { Move } from '../../models/move';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MoveDetails } from '../../models/move-details';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-move-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
],
  templateUrl: './move-list.component.html',
  styleUrl: './move-list.component.css'
})
export class MoveListComponent implements OnInit {

  moves: Move[];
  moveDetailsList: MoveDetails [];
  displayedColumns = ['id', 'name', 'type', 'power', 'accuracy', 'pp'];
  dataSource = new MatTableDataSource<MoveDetails>();

  constructor(private pokeService: PokeServiceService, private pokeHelperService: PokeHelperService) {
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

  getTypeRetroImageUrl(type: string): string {
    return this.pokeHelperService.getTypeRetroImageUrl(type);
  }
  
  upperFirstLetter(word: string): string {
    return this.pokeHelperService.upperFirstLetter(word);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
