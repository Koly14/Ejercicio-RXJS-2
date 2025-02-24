import { Routes } from '@angular/router';
import {MovieListComponent} from "./components/movies/movie-list/movie-list.component";
import {MovieEditComponent} from "./components/movies/movie-edit/movie-edit.component";
import {CartComponent} from "./components/cart/cart.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movie-list',
    pathMatch: "full",
  },
  {
    path: 'movie-list',
    component: MovieListComponent,
  },
  {
    path: 'movie-add',
    component: MovieEditComponent,
  },
  {
    path: 'movie-edit/:id',
    component: MovieEditComponent,
  },
  {
    path: 'movie-cart',
    component: CartComponent,
  },
  {
    path: "**",
    redirectTo: "movie-list",
    pathMatch: "full",
  },

];
