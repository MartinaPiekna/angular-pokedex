import { Component } from '@angular/core';
import { ApiPokedexService } from '../api-pokedex/api-pokedex.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-route-one',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './route-one.component.html',
  styleUrl: './route-one.component.scss',
})
export class RouteOneComponent {
  constructor(private apiPokedexService: ApiPokedexService) {}

  //public pokeList$ = this.apiPokedexService.getPokemonList$();

  /* 
  BehaviorSubject requires an initial value upon instantiation.
  When a new observer subscribes to a BehaviorSubject, it immediately receives the current value (or the last value that was emitted).
  */
  public limit$ = new BehaviorSubject<number>(5);

  // We need to use pipe method fopr our data strem, it allows us to create any useful predefined logic operators related to RXjs, we can chain them
  public pokeList$ = this.limit$.pipe(
    switchMap((changedLimit) =>
      this.apiPokedexService.getPokemonList$(changedLimit, 0)
    ),
    // Using tap to analyze a value and force an error or console.log a value from the previous method e.g. switchMap
    tap((resultOfSwitchmap: any) => console.log(resultOfSwitchmap))
  );

  changeLimit(limit: number) {
    this.limit$.next(limit);
  }
}
