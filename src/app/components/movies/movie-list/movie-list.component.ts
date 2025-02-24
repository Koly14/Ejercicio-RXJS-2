import {Component, inject} from '@angular/core';
import {MovieApiService} from "../../../services/movie-api.service";
import {SearchService} from "../../../services/search.service";
import {Movie} from "../../../common/interfaceMovie";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCartShopping, faFileEdit, faMagnifyingGlass, faTrash} from "@fortawesome/free-solid-svg-icons";
import {NgbPagination, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {Router, RouterLink} from "@angular/router";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    FaIconComponent,
    NgbPagination,
    NgbToast,
    RouterLink
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {

  private readonly movieService:MovieApiService = inject(MovieApiService);
  private readonly searchService:SearchService = inject(SearchService);
  private readonly cartService:CartService = inject(CartService);
  private readonly router:Router = inject(Router);

  movieList!:Movie[];
  page:number = 1;
  total!:number;
  limit:number = 10;

  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faTrash = faTrash;
  protected readonly faCartShopping = faCartShopping;
  protected readonly faFileEdit = faFileEdit;

  // CREACION TOAST
  toast = {
    body: "",
    color: "",
  }
  showToast:boolean = false;

  constructor() {
    this.loadMovies();
    this.loadSearch();
  }

  protected loadMovies() {
    this.movieService.getMovies(this.page, this.limit).subscribe(
      {
        next: value => {
          this.movieList = value.data;
          this.total = value.info.total;
          this.toastCall("Movies Loaded", "bg-success");
        },
        complete:() => console.log("Carga completada"),
        error:err => console.log(err.message),
      }
    )
  }

  // Funcion Toast
  private toastCall (message:string, color:string) {
    this.toast.body = message;
    this.toast.color = color;
    this.showToast = true;
    setTimeout( () => {
      this.showToast = false;
    },200)
  }

  delete(_id: string) {
    this.movieService.deleteMovie(_id).subscribe(
      {
        next: value => {
          this.toastCall("Elemento eliminado", "bg-danger");
          this.router.navigateByUrl("/movie-list");
        },
        error:err => console.error(err),
        complete:() => console.log("ok"),
      }
    )
  }

  // SEARCH
  buscar(event:any){
    const query = event.target.value;
    if (query){
      this.searchService.search(query);
    } else {
      this.loadMovies();
    }
  }

  private loadSearch() {
    this.searchService.start().subscribe(
      {
        next: value => {
          this.movieList = value;
        },
        error:err => console.log(err.message),
        complete:() => console.log("value"),
      }
    )
  }

  // CARRITO
  addToCart(movie: Movie) {
    this.cartService.addToCart(movie);
  }

}
