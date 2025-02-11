import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment/environment";
import {Observable, Subject, switchMap} from "rxjs";
import {Movie} from "../common/interfaceMovie";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly urlBase: string = environment.baseUrl;

  private palabra:Subject<string> = new Subject<string>();
  private MovieSearched$:Observable<Movie[]> = this.palabra.pipe(
    switchMap(res => {
     return this.httpClient.get<Movie[]>(this.urlBase+"byName?name="+res);
    })
  );

  constructor() { }

  search(word:string) {
    this.palabra.next(word);
  }

  start():Observable<Movie[]> {
    return this.MovieSearched$;
  }

}
