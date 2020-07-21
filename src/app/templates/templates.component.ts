import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LabResultsService } from '../services/templates/lab-results.service';

import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';


// ADD_BASE_TEMPLATE
const ADD_BASE_TEMPLATE = gql `
  mutation ($compositions: BaseTemplateEnV1Composition!) {
    createBaseComposition(compositions: $compositions) {
      categoryDefiningcode
      location
      progressNote {
        id
        someField
      }
      medicationOrder {
        id
        narrativeValue
      }
      diagnosis {
        id
        commentValue
        clinicalDescriptionValue
        diagnosisNameValue
        bodySite {
          id
          value
        }
      }
    }
  }
  `;


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  @Input() templateName: string;
  labResultForm: FormGroup;
  medicalDatas: MatTableDataSource<[]>;

  llocation;
  progressNote;
  narrativeValue;
  commentValue;
  diagnosisNameValue;
  clinicalDescriptionValue;
  courseDescriptionValue;
  bodySite;
  categoryDefiningcode = 'EVENT';

  displayedColumns: string[] = ['id', 'narrative_value',];
  private querySubscription: Subscription;
  dataSource = [];

  medicalData;
  compositions;

  rates: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.fetchComposition();
    //this.renderForm();
  }
/*
  ngOnChanges(changes: SimpleChanges): void {
    this.renderForm();
    this.fetchMedicalDatas();
  }
*/

  // tslint:disable-next-line: typedef

  fetchComposition(){
    let dataSource = [];
    const getCompositionsData = gql`
      query {
        getCompositions {
          medicationOrder {
            id
            narrativeValue
          }
        }
      }
    `;
    this.querySubscription = this.apollo.watchQuery<any>({
      query: getCompositionsData
    })
      .valueChanges
      .subscribe(({ data }) => {
        const compositions = data['getCompositions'];
        compositions.forEach(element => {
          const medicationOrderList = element['medicationOrder'];
          medicationOrderList.forEach(medicationOrder => {
            const singleData = {
              "id": medicationOrder.id,
              "narrativeValue": medicationOrder.narrativeValue
            };
            dataSource.push(singleData);
          });
        });
        this.medicalDatas = new MatTableDataSource(dataSource);
      });
  }

  process(e) {
    let COMPOSITION = {
      compositions: {
        categoryDefiningcode: this.categoryDefiningcode,
        location: this.llocation,
        progressNote: {
          someField: this.progressNote
        },
        medicationOrder: [
          {
            narrativeValue: this.narrativeValue
          }
        ],
        diagnosis: [
          {
            commentValue: this.commentValue,
            diagnosisNameValue: this.diagnosisNameValue,
            clinicalDescriptionValue: this.clinicalDescriptionValue,
            courseDescriptionValue: this.courseDescriptionValue,
            bodySite: {
              value: this.bodySite
            }
          }
        ]
      }
     };
    e.preventDefault();
    this.apollo.mutate({
      mutation: ADD_BASE_TEMPLATE,
      variables: COMPOSITION
    })
    .subscribe(({ data }) => {
      this.compositions;
      console.log('data ', data);
      Swal.fire('Success', 'Data created', 'success');
      this.fetchComposition();
    },(error) => {
      console.log('there was an error sending the query', error);
      Swal.fire('Error Found', error.toString(), 'error');
    });
  }
/*
  fetchMedicalDatas() {
    this.labResultsService
      .fetchMedicalDatas('d7fad085-5bbb-486e-8cfb-5ae040122f75')
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
*/
}
