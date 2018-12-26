import { Component, OnInit } from '@angular/core';
import { Movie } from "src/app/models/movie";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ValidationService } from "../../services/validation.service";
import { IdService } from "../../services/id.service";
import { Store } from "@ngrx/store";
import * as MoviesActions from "../../actions/movies.actions";
import { AppState } from "../../app.state";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private idService: IdService,
    private validation: ValidationService
  ) {}

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  ngOnInit() {
    this.editForm = this.fb.group({
      Title:'',
      Year:'',
      Runtime:'',
      Genre:'',
      Director:'',
    });

    this.editForm.valueChanges.subscribe(() => {});
  }

  onSubmit() {
    const temp = {
      ...this.editForm.value,
      Id: this.idService.getId() ,//need to limit this
      Runtime: String(this.editForm.value.Runtime)
    };
    let validation = this.validation.isFormValid(temp);
    if (!validation) {
      this.store.dispatch(new MoviesActions.AddMovie(temp));
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
