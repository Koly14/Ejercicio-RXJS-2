import {Component, inject} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Movie} from "../../common/interfaceMovie";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  private readonly cartService:CartService = inject(CartService);
  movieList:Movie[] = [];
  precioTotal:number = 0;
  cantidadCarrito:number = 0;

  constructor() {
    this.loadMovies();
    //this.loadTotal();
    this.loadCantidadCarrito();
  }


  private loadMovies() {
    this.cartService.carrito.subscribe(
      {
        next: value => this.movieList = value,
        error: err => console.log(err.message),
        complete: () => console.log("complete"),
      }
    )
  }

  private loadCantidadCarrito() {
    this.cartService.cantidadCarrito.subscribe(
      {
        next: value => this.cantidadCarrito = value,
        error: err => console.log(err.message),
      }
    )
  }
}
