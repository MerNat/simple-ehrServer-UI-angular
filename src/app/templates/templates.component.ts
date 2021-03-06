import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LabResultsService } from '../services/templates/lab-results.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  @Input() templateName: string;
  labResultForm: FormGroup;
  medicalDatas = [];

  medicalData;
  constructor(private labResultsService: LabResultsService) {}

  ngOnInit(): void {
    this.renderForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderForm();
    this.fetchMedicalDatas();
  }

  fetchMedicalDatas() {
    this.labResultsService
      .fetchMedicalDatas('e5f3fc74-edbd-4dc1-9537-f8f037383968')
      .then((res) => {
        console.log(res);
        this.medicalDatas = res.result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fetchSingleData(medicalUuid: string) {
    this.labResultsService
      .fetchMedicalData(medicalUuid)
      .then((res) => {
        this.medicalData = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderForm() {
    switch (this.templateName) {
      case 'Lab results':
        this.initLabResultForm();
        break;
    }
  }

  initLabResultForm() {
    this.labResultForm = new FormGroup({
      report_id: new FormControl('Some report id', [Validators.required]),
      status: new FormControl('Random Status Input', [Validators.required]),
      test_name: new FormControl('Lab Test Name', [Validators.required]),
      test_status: new FormControl('Registered', [Validators.required]),

      diagnostic_service_category: new FormControl(
        'some diagnostic service category',
        [Validators.required]
      ),
      clinical_information_provided: new FormControl('some clinical info', [
        Validators.required,
      ]),
      analyte_name: new FormControl('Some Analyte Name', [Validators.required]),
      analyte_result: new FormControl('223.3', [Validators.required]),

      comment: new FormControl('Some comment here.', [Validators.required]),
      reference_range_guidance: new FormControl('200-230', [
        Validators.required,
      ]),
      analyte_result_status: new FormControl('Partial', [Validators.required]),
      conclusion: new FormControl('Doc Conculsion', [Validators.required]),
      test_diagnosis: new FormControl('Diagnosis Data', [Validators.required]),
      comment_diagnosis: new FormControl('Comment diagnosis', [
        Validators.required,
      ]),
    });
  }

  submitForm() {
    if (!this.labResultForm.valid) {
      Swal.fire('Not valid', 'Form is not valid', 'error');
      return;
    }
    console.log(this.labResultForm.value);
    this.labResultsService
      .createLabResult(this.labResultForm.value)
      .then((result) => {
        if (result.error) {
          Swal.fire('Error Found', result.error.message, 'error');
          return;
        }
        Swal.fire('Success', 'Medical record created.', 'success');
        this.fetchMedicalDatas();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
