import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ApiPokedexService } from '../api-pokedex/api-pokedex.service';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  switchMap,
  tap,
} from 'rxjs';
import { CardComponent } from '../card/card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs/operators';
import { Pokedex, PokedexItem } from '../api-pokedex/api-pokedex.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  constructor(private apiPokedexService: ApiPokedexService) {}

  /* 
  BehaviorSubject requires an initial value upon instantiation.
  When a new observer subscribes to a BehaviorSubject, it immediately receives the current value (or the last value that was emitted).
  */
  public pageSize$ = new BehaviorSubject<number>(10);
  public pageIndex$ = new BehaviorSubject<number>(0);

  // pipe method for our data stream, it allows us to create any useful predefined logic operators related to RXjs, we can chain them
  public pokeList$: Observable<Pokedex> = combineLatest([
    this.pageSize$,
    this.pageIndex$,
  ]).pipe(
    switchMap((data) => {
      // switches different Observables
      return this.apiPokedexService.getPokemonList$(data[0], data[0] * data[1]);
    }),
    // Using tap to analyze a value and force an error or console.log a value from the previous method e.g. switchMatch
    tap((resultOfSwitchmap: any) => console.log(resultOfSwitchmap))
  );

  // new data stream
  public searchedPokemon$ = new BehaviorSubject<string | null>('');

  //new data stream
  public filteredPokeList$ = combineLatest([
    // returns array
    this.pokeList$, // value[0]
    this.searchedPokemon$, // value [1]
  ]).pipe(
    map((value) => {
      // value is array from combineLatest
      // returns Observable
      return value[0].results.filter((pokemon: PokedexItem) => {
        if (value[1] !== null) {
          return pokemon.name.toLowerCase().includes(value[1].toLowerCase());
        } else {
          return true;
        }
      });
    })
  );

  @Input() length!: number;
  @Input() pageSize!: number;
  @Input() pageSizeOptions: number[] = [10, 20, 30];
  @Input() dataSource!: number;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  ngOnInit(): void {}

  public handlePage(e: PageEvent) {
    // next() method sends a new value into the data stream
    this.pageIndex$.next(e.pageIndex);
    this.pageSize$.next(e.pageSize);
  }

  // Function to filter items based on user input
  filterItems(e: any): void {
    // access properties specific to InputEvent
    const value = e.target.value as string;
    this.searchedPokemon$.next(value);
  }

  // Function to clear the input and show all items
  clearInput(): void {
    this.input.nativeElement.value = '';
    this.searchedPokemon$.next('');
  }
}
