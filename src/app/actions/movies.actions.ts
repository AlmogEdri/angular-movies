import { Action } from "@ngrx/store";
import { Movie } from "./../models/movie";


export const ADD_MOVIE = "Add";
export const EDIT_MOVIE = "Edit";
export const DELETE_MOVIE = "Delete";
export const INITIAL_DATA_LOADED = "InitialDataLoaded";


export class AddMovie implements Action {
  readonly type = ADD_MOVIE;
  constructor(public payload: Movie) {
  }
}

export class EditMovie implements Action {
  readonly type = EDIT_MOVIE;
  constructor(public payload: Movie) {
  }
}

export class DeleteMovie implements Action {
  readonly type = DELETE_MOVIE;
  constructor(public payload: number) {
  }
}

export class InitialDataLoaded implements Action {
  readonly type = INITIAL_DATA_LOADED;
  constructor(public payload: Array<Movie>) {
  }

}

export type Actions = AddMovie | DeleteMovie | InitialDataLoaded | EditMovie ;