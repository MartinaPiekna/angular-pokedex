import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { Pokemon } from '../api-pokedex/api-pokedex.model';
import { ApiPokedexService } from '../api-pokedex/api-pokedex.service';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class CardComponent {
  constructor(private apiPokedexService: ApiPokedexService) {}

  // the exclamation mark means we surely know we use this variable somewhere
  // @Input is a binding method which helps to use specific variables from child to parent comp.
  @Input() name!: string;
  @Input() set url(url: string) {
    const id = this.extractNumberFromUrl(url);

    this.pokemon$ = this.apiPokedexService.getPokemonByUrl$(id);
  }

  extractNumberFromUrl(url: string): number {
    // Use URL constructor to parse the URL
    const parsedUrl = new URL(url);

    // Extract the last path segment and convert it to a number
    const lastPathSegment = parsedUrl.pathname.split('/').filter(Boolean).pop();
    const number = parseInt(lastPathSegment as string, 10);

    return number;
  }

  pokemon$!: Observable<Pokemon>;
}
