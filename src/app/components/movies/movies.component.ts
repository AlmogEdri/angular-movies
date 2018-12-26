import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Movie } from "../../models/movie";
import { HttpService } from "../../services/http.service";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"]
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  emptyMovies: boolean;
  constructor(
    private store: Store<AppState>,
    private httpService: HttpService
  ) {
    this.emptyMovies = false;
    this.store.select("movies").subscribe(data => (this.movies = data));
  }

  ngOnInit() {
  }
}
