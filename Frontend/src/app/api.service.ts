import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private SERVER_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}
  get(): Observable<any[]> {
    // Replace this with your actual API endpoint URL
    return this.httpClient.get<any[]>(this.SERVER_URL);
  }
}
