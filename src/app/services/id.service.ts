import { Injectable } from "@angular/core";

@Injectable()
export class IdService {
  private id = 0;

  constructor() {
    
  }
  getId() {
      this.id++;
      return this.id;
  }
}
