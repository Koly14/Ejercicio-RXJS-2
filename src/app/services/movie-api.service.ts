import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment/environment";
import {map, Observable} from "rxjs";
import {ApiResponseMovie, ApiResponseMovies, Movie, StatusMessage} from "../common/interfaceMovie";

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  private readonly http:HttpClient = inject(HttpClient);
  private readonly baseUrl:string = environment.baseUrl;

  constructor() { }

  /** Observable es lo que esperamos y el return lo que nos devuelve la API en el json
   *  y con el map sacamos nosotros directamente lo que queremos
  */

  // ALL MOVIES PAGINATED
  getMovies(page:number, limit:number ):Observable<ApiResponseMovies> {
    return this.http.get<ApiResponseMovies>(this.baseUrl+"paginated?page="+page+"&limit="+limit);
  }

  //GET 1 MOVIE
  getOnMovie(id:string):Observable<Movie> {
    return this.http.get<ApiResponseMovie>(this.baseUrl+"movie/"+id).pipe(
      map(value => value.data)
    );
  }

  /**
   * Add - Edit - Delete --> Tienen el mismo tipo de interface (status, message)
   */

  // ADD MOVIE (El objeto)
  insertMovie(movie:Movie):Observable<StatusMessage>{
    return this.http.post<StatusMessage>(this.baseUrl,movie);
  }

  // EDIT MOVIE (el id y el objeto)
  updateMovie(id:string, movie:Movie):Observable<StatusMessage>{
    return this.http.put<StatusMessage>(this.baseUrl+"update/"+id,movie);
  }

  // DELETE MOVIE (Solo el id)
  deleteMovie(id:string):Observable<StatusMessage>{
    return this.http.delete<StatusMessage>(this.baseUrl+"delete/"+id);
  }

}
