import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { HttpService } from "./services/http.service";
import { IdService } from "./services/id.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostComponent } from "./components/post/post.component";

import { StoreModule } from "@ngrx/store";
import { movieReducer } from "./reducers/movies.reducer";
import { MoviesComponent } from "./components/movies/movies.component";
import { BtnEditComponent } from "./components/buttons/btn-edit/btn-edit.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BtnDeleteComponent } from "./components/buttons/btn-delete/btn-delete.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MovieTimePipe } from './pipes/movie-time.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OnlyEnglishPipe } from './pipes/only-english.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    MoviesComponent,
    BtnEditComponent,
    BtnDeleteComponent,
    SearchBarComponent,
    MovieTimePipe,
    NavbarComponent,
    OnlyEnglishPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      movies: movieReducer
    }),
    NgbModule.forRoot()
  ],
  providers: [HttpService, IdService],
  bootstrap: [AppComponent]
})
export class AppModule {}
