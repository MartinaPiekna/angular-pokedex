import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokedex, Pokemon } from './api-pokedex.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiPokedexService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://pokeapi.co/api/v2';

  getPokemonList$(limit: number = 50, offset: number = 0): Observable<Pokedex> {
    return this.http.get<any>(
      `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
    );
  }

  getPokemonByUrl$(id: number): Observable<Pokemon> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${id}`);
  }
}
