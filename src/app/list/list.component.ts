import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiPokedexService } from '../api-pokedex/api-pokedex.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, switchMap, tap } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent, MatPaginatorModule],
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
  public pokeList$ = combineLatest([this.pageSize$, this.pageIndex$]).pipe(
    switchMap((data) => {
      return this.apiPokedexService.getPokemonList$(data[0], data[0] * data[1]);
    }),
    // Using tap to analyze a value and force an error or console.log a value from the previous method e.g. switchMatch
    tap((resultOfSwitchmap: any) => console.log(resultOfSwitchmap))
  );

  @Input() length!: number;
  @Input() pageSize!: number;
  @Input() pageSizeOptions: number[] = [10, 20, 30];
  @Input() dataSource!: number;
  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  ngOnInit(): void {}

  public handlePage(e: PageEvent) {
    // next() method sends a new value into the data stream
    this.pageIndex$.next(e.pageIndex);
    this.pageSize$.next(e.pageSize);
  }
}
