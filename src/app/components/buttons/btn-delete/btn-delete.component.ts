import { Component, OnInit, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import * as MoviesActions from "../../../actions/movies.actions";
import { AppState } from "../../../app.state";

@Component({
  selector: "app-btn-delete",
  templateUrl: "./btn-delete.component.html",
  styleUrls: ["./btn-delete.component.scss"]
})
export class BtnDeleteComponent implements OnInit {
  @Input() movieId: number;
  constructor(private modalService: NgbModal, private store: Store<AppState>) {}

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: "dark-modal" });
  }
  ngOnInit() {}

  onDeleteMovie() {
    this.store.dispatch(new MoviesActions.DeleteMovie(this.movieId));
    return this.modalService.dismissAll();
  }
}
