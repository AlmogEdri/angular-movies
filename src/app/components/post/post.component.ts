import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Movie } from "../../models/movie";
import { HttpService } from "../../services/http.service";
import * as MoviesActions from "../../actions/movies.actions";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {
  @Input() movie: Movie;
  showDetails: boolean;
  @ViewChild("detailsBox") detailsBox: ElementRef;

  constructor() {
    this.showDetails = false;
  }

  onShowHideDetails = () => {
    const MAX_OPEN = 70,
      MIN_OPEN = 0,
      MOVMENT_SPEED = 40;
    this.showDetails = !this.showDetails;
    if (this.showDetails) {
      for (let height = MIN_OPEN; height <= MAX_OPEN; height++) {
        setTimeout(
          () => (this.detailsBox.nativeElement.style.height = height + "px"),
          MOVMENT_SPEED
        );
      }
    } else {
      for (let height = MAX_OPEN; height >= MIN_OPEN; height--) {
        setTimeout(
          () => (this.detailsBox.nativeElement.style.height = height + "px"),
          MOVMENT_SPEED
        );
      }
    }
  };
  ngOnInit() {}
}
