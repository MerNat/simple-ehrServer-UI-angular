import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private serverUrl = 'http://localhost:8090/';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGNhYm9sYWJzLmNvbSIsImV4dHJhZGF0YSI6eyJvcmdfdWlkIjoiZTlkMTMyOTQtYmNlNy00NGU3LTk2MzUtOGU5MDZkYTBjOTE0In0sImlzc3VlZF9hdCI6IjIwMjAtMDctMTNUMDc6MTE6MTQuNDIzWiIsImV4cGlyZXNfYXQiOiIyMDIwLTA3LTE0VDA3OjExOjE0LjQ5N1oifQ.JAw34uABtSpb14ReaaDAAB7AzgqGG01ZDTbyHsksdCg'
  });

  constructor(private http: HttpClient) { }

  getTemplates() {
    return this.http.get(this.serverUrl + 'rest/v1/templates', {
      headers: this.headers
    })
      .toPromise()
      .then(res => res)
      .catch(err => err);
  }
}
