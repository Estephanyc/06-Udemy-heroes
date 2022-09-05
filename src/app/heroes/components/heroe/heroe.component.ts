import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-details',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponentDetail implements OnInit {

  @Input() heroe!: Heroe;
  constructor(private routerActivated: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
