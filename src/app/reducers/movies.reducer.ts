import { Action } from "@ngrx/store";
import * as MoviesActions from "./../actions/movies.actions";
import { Movie } from "./../models/movie";
import { HttpService } from "../services/http.service";

export const initialState: Movie = {
  Id: 1,
  Title: "MOVIE name",
  Year: "1989",
  Runtime: "2 hours",
  Genre: "action",
  Director: "Almog"
};

export function movieReducer(
  state: Array<Movie> = [initialState],
  action: MoviesActions.Actions
) {
  let temp = [...state];
  switch (action.type) {
    case MoviesActions.ADD_MOVIE:
      return [...state, action.payload];
    case MoviesActions.EDIT_MOVIE:
      temp[temp.findIndex(x => x.Id === action.payload.Id)] = action.payload;
      return temp;
    case MoviesActions.DELETE_MOVIE:
      return removeFromArray(state, action.payload);
    case MoviesActions.INITIAL_DATA_LOADED:
      return action.payload;
    default:
      return state;
  }
}

function removeFromArray(arr: Movie[], id: number) {
  let arr1 = [];
  arr.map(x => {
    if (x.Id != id) arr1.push(x);
  });
  if (arr1[0]) return arr1;
  return arr;
}
