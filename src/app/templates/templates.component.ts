import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  @Input() templateName: string;
  labResultForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.renderForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderForm();
  }

  renderForm() {
    switch (this.templateName) {
      case 'Lab results':
        console.log('init lab');
        this.initLabResultForm();
        break;
    }
  }

  initLabResultForm() {
    this.labResultForm = new FormGroup({
      report_id: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      test_name: new FormControl('', [Validators.required]),
      test_status: new FormControl('', [Validators.required]),

      diagnostic_service_category: new FormControl('', [Validators.required]),
      clinical_information_provided: new FormControl('', [Validators.required]),
      analyte_name: new FormControl('', [Validators.required]),
      analyte_result: new FormControl('', [Validators.required]),


      comment: new FormControl('', [Validators.required]),
      reference_range_guidance: new FormControl('', [Validators.required]),
      analyte_result_status: new FormControl('Partial', [Validators.required]),
      conclusion: new FormControl('', [Validators.required]),
      test_diagnosis: new FormControl('', [Validators.required]),
      comment_diagnosis: new FormControl('', [Validators.required]),


    });
  }

  submitForm() {}
}
