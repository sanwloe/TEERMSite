import { Component , OnInit} from '@angular/core';
import { DataService } from '../DataService'
import { TranslocoService } from '@ngneat/transloco'

@Component({
  selector: 'app-socialnetworks',
  templateUrl: './socialnetworks.component.html',
  styleUrls: ['./socialnetworks.component.css'],
})
export class SocialnetworksComponent implements OnInit {

  constructor(private service: DataService,private servicelang : TranslocoService) { }

  isExpand: boolean = true;
  stylebutton: any = {};
  toggle() {
      this.service.toggle_nav(!this.isExpand);
      this.isExpand = !this.isExpand;
  }
  
  languages : any = {};
  ngOnInit()
  {
    this.languages = this.servicelang.getAvailableLangs();
  }
  changelang(lang : any)
  {
    const eventTarget = lang as HTMLSelectElement;

    this.servicelang.setActiveLang(eventTarget.value);
  }


  


}
