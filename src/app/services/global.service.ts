import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private serverUrl = 'http://localhost:8090/';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGNhYm9sYWJzLmNvbSIsImV4dHJhZGF0YSI6eyJvcmdfdWlkIjoiZTlkMTMyOTQtYmNlNy00NGU3LTk2MzUtOGU5MDZkYTBjOTE0In0sImlzc3VlZF9hdCI6IjIwMjAtMDctMDlUMDY6NTA6NTYuNzk0WiIsImV4cGlyZXNfYXQiOiIyMDIwLTA3LTEwVDA2OjUwOjU2Ljg1OFoifQ.soBQaICVdYOL3X3WBd2T6sVFpsbpNmZmwXgYkZ1xuB0'
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
