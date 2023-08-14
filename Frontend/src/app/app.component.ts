import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ghydra';
  currentTime = new Date();

  ngOnInit(): void {
    // Update currentTime every second using setInterval
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
}
