import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private serverUrl = 'http://localhost:9090/';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGNhYm9sYWJzLmNvbSIsImV4dHJhZGF0YSI6eyJvcmdfdWlkIjoiZTlkMTMyOTQtYmNlNy00NGU3LTk2MzUtOGU5MDZkYTBjOTE0In0sImlzc3VlZF9hdCI6IjIwMjAtMDctMTZUMDg6MzQ6NDYuOTUzWiIsImV4cGlyZXNfYXQiOiIyMDIwLTA3LTE3VDA4OjM0OjUwLjYxMVoifQ.ajnUO6bubh8bfrFKI2-2OLvXC5ZRPpxT1RisMdJ59Jo'
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
