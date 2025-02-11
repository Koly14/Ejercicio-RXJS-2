import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private readonly cartService: CartService = inject(CartService);
  carritoCount!: number;

  constructor() {
    this.cartService.cantidadCarrito.subscribe(
      {
        next: value => this.carritoCount = value,
        error: err => console.log(err.message),
        complete:() => console.log("complete"),
      }
    )
  }


}
