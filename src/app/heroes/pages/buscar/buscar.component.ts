import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [] ;
  heroeSeleccionado!: Heroe;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
   this.heroesService.getHeroesSugerencia(this.termino).subscribe(
    heroes => this.heroes = heroes )
  }

  opcionSelecionada(event: MatAutocompleteSelectedEvent) {
    const heroe = event.option.value;
    this.termino = heroe;

    if(!heroe)  return
    this.heroesService.getHeroeById(heroe).subscribe( heroe => this.heroeSeleccionado = heroe)
  }

}
