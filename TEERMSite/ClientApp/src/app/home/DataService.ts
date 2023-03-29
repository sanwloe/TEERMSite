import { Injectable } from '@angular/core'

@Injectable()
export class DataService {

  nav_expand: boolean = true;

  toggle_nav(data : boolean) {
    this.nav_expand = data;
  }
}
