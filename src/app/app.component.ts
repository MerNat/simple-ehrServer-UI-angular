import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  templates;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.fetchTemplates();
  }

  fetchTemplates() {
    this.globalService.getTemplates().then(data => {
      this.templates = data.templates;
      console.log(this.templates);
    });
  }
}
