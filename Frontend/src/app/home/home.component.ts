import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.get().subscribe((data: any[]) => {
      console.log(data);
      console.log('====================================');
      console.log('this shit is working');
      console.log('====================================');
      this.products = data;
    });
  }
}
