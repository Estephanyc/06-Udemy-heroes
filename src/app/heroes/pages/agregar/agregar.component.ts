import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  constructor(private heroesService : HeroesService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      switchMap(( { id }) => this.heroesService.getHeroeById(id))
    )
    .subscribe( heroe => this.heroe = heroe)
  }

  publishers = [
    {
      id: "DC Comics",
      desc: "DC Comics"
    },
    {
      id: "Marvel Comics",
      desc: "Marvel Comics"
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    publisher: Publisher.DCComics,
    first_appearance: '',
    characters: '',
    alt_img: ''
  }

  guardar() {
    if(this.heroe.superhero.trim().length === 0) {
      return;
    }

    if(this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe => {
        console.log(heroe)
      })
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe(heroe => {
        console.log(heroe)
      })
    }

    
  }

}
