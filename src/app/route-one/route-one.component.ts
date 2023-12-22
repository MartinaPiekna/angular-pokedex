import { Component } from '@angular/core';
import { ApiPokedexService } from '../api-pokedex/api-pokedex.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-route-one',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './route-one.component.html',
  styleUrl: './route-one.component.scss',
})
export class RouteOneComponent {
  constructor(private apiPokedexService: ApiPokedexService) {}

  //public pokeList$ = this.apiPokedexService.getPokemonList$();
  public limit$ = new BehaviorSubject<number>(5);

  public pokeList$ = this.limit$.pipe(
    switchMap((changedLimit) =>
      this.apiPokedexService.getPokemonList$(changedLimit, 0)
    )
  );

  changeLimit(limit: number) {
    this.limit$.next(limit);
  }
}
