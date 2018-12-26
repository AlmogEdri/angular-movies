import { Movie } from "./models/movie";

export interface AppState {
  readonly movie: Movie[];
}
