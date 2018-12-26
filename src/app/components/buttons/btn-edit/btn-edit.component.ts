import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Movie } from "src/app/models/movie";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ValidationService } from "../../../services/validation.service";
import { Store } from "@ngrx/store";
import * as MoviesActions from "../../../actions/movies.actions";
import { AppState } from "../../../app.state";

@Component({
  selector: "app-btn-edit",
  templateUrl: "./btn-edit.component.html",
  styleUrls: ["./btn-edit.component.scss"]
})
export class BtnEditComponent implements OnInit {
  @Input() movieObject: Movie;
  editForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private validation: ValidationService
  ) {}

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  ngOnInit() {
    this.editForm = this.fb.group({
      Title: this.movieObject.Title,
      Year: this.movieObject.Year,
      Runtime: parseInt(this.movieObject.Runtime),
      Genre: this.movieObject.Genre,
      Director: this.movieObject.Director
    });

    this.editForm.valueChanges.subscribe(() => {});
  }
  onSubmit() {
    const temp = {
      ...this.editForm.value,
      Id: this.movieObject.Id,
      Runtime: String(this.editForm.value.Runtime)
    };
    let validation = this.validation.isFormValid(temp);
    if (!validation) {
      this.store.dispatch(new MoviesActions.EditMovie(temp));
      return this.modalService.dismissAll();
    } else {
      this.addErrors(validation);
    }
  }
  addErrors(validation) {
    var paras = document.getElementsByClassName("alert-danger");

    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }
    Object.keys(validation).map(x => {
      if (validation[x].length > 0) {
        var div = document.createElement("div");
        var error = document.createTextNode(validation[x]);
        div.appendChild(error);
        const errorDiv =
          "<div class='alert-danger'>" + validation[x] + "</div>";
        document
          .getElementById(x.toLowerCase())
          .insertAdjacentHTML("afterend", errorDiv);
      }
    });
  }
}
