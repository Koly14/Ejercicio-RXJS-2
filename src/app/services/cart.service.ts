import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Movie} from "../common/interfaceMovie";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carrito: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  cantidadCarrito: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // precioCarrito: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(movie:Movie) {
    var carritoAux = this.carrito.value;
    //var precioCarrito = this.precioCarrito.value;

    carritoAux.push(movie);
    this.carrito.next(carritoAux);

    this.cantidadCarrito.next(carritoAux.length);

    // this.precioCarrito.next(precioCarrito+movie.price);
  }


}
