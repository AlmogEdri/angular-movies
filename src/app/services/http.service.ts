import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IdService } from "./id.service";
import { Movie } from "../models/movie";
import { Store } from "@ngrx/store";
import { AppState } from "./../app.state";
import * as MoviesActions from "./../actions/movies.actions";
import { ifError } from "assert";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  readonly API_KEY = "&apikey=f408bafd";
  readonly URL_SEARCH1 = "?s=sun";
  readonly URL_SEARCH2 = "?i=";
  readonly URL_SEARCH3 = "?s=";
  readonly URL = "http://www.omdbapi.com/";

  constructor(
    private http: HttpClient,
    private idService: IdService,
    private store: Store<AppState>
  ) {
    this.getPosts();
  }

  getPosts = (): any => {
    let movies: Movie[] = null;
    fetch(this.URL + this.URL_SEARCH1 + this.API_KEY)
      .then(response => response.json())
      .then(json => {
        movies = this.fixPosts(json["Search"]);
      });
  };

  fixPosts = (tempMovies: Array<Object>): any => {
    let movies: Array<Movie> = [];
    for (let movie of tempMovies) {
      fetch(this.URL + this.URL_SEARCH2 + movie["imdbID"] + this.API_KEY)
        .then(response => response.json())
        .then(json => {
          const temp: Movie = {
            Id: this.idService.getId(),
            Title: json.Title,
            Year: json.Year.replace(/\s/g, ''),
            Runtime: json.Runtime.replace(/min/g,''),
            Genre: json.Genre,
            Director: json.Director
          };
          movies.push(temp);
        });
    }
    this.store.dispatch(new MoviesActions.InitialDataLoaded(movies));
    return movies;
  };

  searchPosts = (searchValue: string) => {
    let movies: Movie[] = null;
    let error = false;
    fetch(this.URL + this.URL_SEARCH3 + searchValue + this.API_KEY)
      .then(response => {
        return response.json();
      })
      .then(json => {
        movies = this.fixPosts(json["Search"]);
      })
      .catch(() => this.store.dispatch(new MoviesActions.InitialDataLoaded([]))
      );
  };

  ngOnInit(): void {}
}
