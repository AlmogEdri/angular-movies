import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Movie } from "../../models/movie";
import { HttpService } from "../../services/http.service";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchInput') searchInput; 
  movies: Movie;
  constructor(
    private store: Store<AppState>,
    private httpService: HttpService
  ) {
    this.store.select("movies").subscribe(data => (this.movies = data));

  }
  onAddMovie(event: any) {
    if(event.key ==='Enter')
    this.onSearchMovies(this.searchInput.nativeElement.value)
  }
  onSearchMovies(input) {
    this.httpService.searchPosts(input);
  }
  ngOnInit() {}
}
