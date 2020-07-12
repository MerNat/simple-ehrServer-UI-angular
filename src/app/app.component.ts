import { Component, EventEmitter, Output } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  templates;
  template = 'Lab results';

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.fetchTemplates();
  }

  templateChange($event){
    this.template = $event.value;
  }

  fetchTemplates() {
    this.globalService.getTemplates().then(data => {
      this.templates = data.templates;
      console.log(this.templates);
    });
  }
}
