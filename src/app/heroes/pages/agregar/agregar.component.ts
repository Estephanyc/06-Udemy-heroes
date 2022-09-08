import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  constructor(
    private heroesService : HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ) {
      return;
    }

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
        this.mostrarSnackBar('Registro actualizado')
      })
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe(heroe => {
        this.mostrarSnackBar('Registro creado')
        this.router.navigate(['/heroes/editar', heroe.id])
      })
    }
  }

  borrarHeroe() {
    const dialog = this._dialog.open( DialogComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {

        if( result ) {
          this.heroesService.borrarHeroe( this.heroe! )
            .subscribe( resp => {
              this.router.navigate(['/heroes']);
            });
        }
        
      }
    )



  }

  mostrarSnackBar(mensaje: string) {
    this._snackbar.open(mensaje, 'Cerrar', {
      duration: 2550
    })
  }
}
