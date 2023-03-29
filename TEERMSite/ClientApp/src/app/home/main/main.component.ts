import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, OnDestroy {

  timeEnd : Date = new Date('May 1,2023 00:00:00');

  result: any = null;

  days : any = null;
  hours : any = null;
  minutes : any = null;
  seconds : any = null;

  ngOnInit() : void {
      setInterval( async () => {
      const now: Date = new Date();
      const difference: number = this.timeEnd.getTime() - now.getTime();
      if (difference > 0) {
          this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
          this.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          this.minutes = Math.floor((difference / 1000 / 60) % 60);
          this.seconds = Math.floor((difference / 1000) % 60);
      } else {
        this.result = 'Реєстрація закінчена!';
      }
    },1000);
  }
  ngOnDestroy(): void {
    
  }
  
}
