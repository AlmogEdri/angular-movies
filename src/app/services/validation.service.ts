import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as MoviesActions from "./../actions/movies.actions";
import { AppState } from "./../app.state";
import { Movie } from "../models/movie";

@Injectable({
  providedIn: "root"
})
export class ValidationService {
  movies: Movie[];
  constructor(private store: Store<AppState>) {
    this.store.select("movies").subscribe(data => (this.movies = data));
  }
  isFormValid(form) {
    let errors = {
      Title: [],
      Year: [],
      Runtime: [],
      Genre: [],
      Director: []
    };
    let isErrors = false;
    //Title validation
    let subject = form.Title;
    if (subject.length > 70) {
      errors.Title = [
        ...errors.Title,
        "Title can not be longer than 70 characters."
      ];
      isErrors = true;
    }
    if (subject.length < 3) {
      errors.Title = [
        ...errors.Title,
        "Title can not be shorter than 3 characters."
      ];
      isErrors = true;
    }
    if (this.movies.length > 0) {
      let exist = false;
      this.movies.map(x => {
        if (
          subject.localeCompare(x.Title) &&
          !String(x.Id).localeCompare(String(form.Id))
        ) {
          exist = true;
        }
      });
      if (exist) {
        errors.Title = [...errors.Title, "Title alredy exist."];
        isErrors = true;
      }
    }
    //Year validation
    let yearRegEx = /(^\d{4}$|^\d{4}-\d{4}$|^\d{4}–\d{4}$)/;
    subject = form.Year;
    if (subject.length != 4 && subject.length != 9) {
      errors.Year = [
        ...errors.Year,
        "A year can only be written in the following format 2018 or 2016-2018."
      ];
      isErrors = true;
    }
    if (!yearRegEx.test(subject)) {
      console.log(12);
      errors.Year = [
        ...errors.Year,
        "A Year can contain only numbers and the character '-'."
      ];
      isErrors = true;
    }
    //Runtime validation
    subject = parseInt(form.Runtime);
    if (subject < 5 || subject > 9999) {
      errors.Runtime = [
        ...errors.Runtime,
        "The Movie must be longer than 5 minutes and shorter than 9999 minutes."
      ];
      isErrors = true;
    }
    if (String(subject) === "NaN") {
      errors.Runtime = [...errors.Runtime, "Value must be enterd."];
      isErrors = true;
    }
    //Director validation
    subject = form.Director;
    if (subject.length > 70) {
      errors.Director = [
        ...errors.Director,
        "Director field can not be longer than 70 characters."
      ];
      isErrors = true;
    }
    if (subject.length < 3) {
      errors.Director = [
        ...errors.Director,
        "Director field can not be shorter than 3 characters."
      ];
      isErrors = true;
    }
    //Genre validation
    subject = form.Genre;
    if (subject.length > 70) {
      errors.Genre = [
        ...errors.Genre,
        "Genre field can not be longer than 70 characters."
      ];
      isErrors = true;
    }
    if (subject.length < 3) {
      errors.Genre = [
        ...errors.Genre,
        "Genre field can not be shorter than 3 characters."
      ];
      isErrors = true;
    }
    if (isErrors) {
      return errors;
    }
    return false;
  }
}
