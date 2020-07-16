import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class LabResultsService {
  private serverUrl = 'http://localhost:8090/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/xml',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGNhYm9sYWJzLmNvbSIsImV4dHJhZGF0YSI6eyJvcmdfdWlkIjoiZTlkMTMyOTQtYmNlNy00NGU3LTk2MzUtOGU5MDZkYTBjOTE0In0sImlzc3VlZF9hdCI6IjIwMjAtMDctMTRUMTk6MDE6NTguNDUyWiIsImV4cGlyZXNfYXQiOiIyMDIwLTA3LTE1VDE5OjAxOjU4LjQ1MloifQ.DbzmR-Ii60mwENO-5ZENYuUzy0JudTqbPlFs1EqYBpM',
  });

  constructor(private http: HttpClient) {}

  createLabResult(instance) {
    const template =
      `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
    <versions
      xmlns="http://schemas.openehr.org/v1"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <version xsi:type="ORIGINAL_VERSION">
        <contribution>
          <id xsi:type="HIER_OBJECT_ID">
            <value>` +
      uuid.v4() +
      `</value>
          </id>
          <namespace>EHR::COMMON</namespace>
          <type>CONTRIBUTION</type>
        </contribution>
        <commit_audit>
          <system_id>CABOLABS_EHR</system_id>
          <committer xsi:type="PARTY_IDENTIFIED">
            <external_ref>
              <id xsi:type="HIER_OBJECT_ID">
                <value>` +
      uuid.v4() +
      `</value>
              </id>
              <namespace>DEMOGRAPHIC</namespace>
              <type>PERSON</type>
            </external_ref>
            <name>Dr. House</name>
          </committer>
          <time_committed>
            <value>20200712T131652,026+0300</value>
          </time_committed>
          <change_type>
            <value>creation</value>
            <defining_code>
              <terminology_id>
                <value>openehr</value>
              </terminology_id>
              <code_string>249</code_string>
            </defining_code>
          </change_type>
        </commit_audit>
        <uid>
          <value>710f53a8-a222-4153-9e35-49f4ad1703e7::EMR_APP::1</value>
        </uid>
        <data xsi:type="COMPOSITION" archetype_node_id="openEHR-EHR-COMPOSITION.report-result.v1">
          <name>
            <value>Result Report</value>
          </name>
          <archetype_details>
            <archetype_id>
              <value>openEHR-EHR-COMPOSITION.report-result.v1</value>
            </archetype_id>
            <template_id>
              <value>laboratory_results_report.en.v1</value>
            </template_id>
            <rm_version>1.0.2</rm_version>
          </archetype_details>
          <language>
            <terminology_id>
              <value>ISO_639-1</value>
            </terminology_id>
            <code_string>en</code_string>
          </language>
          <territory>
            <terminology_id>
              <value>ISO_3166-1</value>
            </terminology_id>
            <code_string>UY</code_string>
          </territory>
          <category>
            <value>event</value>
            <defining_code>
              <terminology_id>
                <value>openehr</value>
              </terminology_id>
              <code_string>433</code_string>
            </defining_code>
          </category>
          <composer xsi:type="PARTY_IDENTIFIED">
            <external_ref>
              <id xsi:type="HIER_OBJECT_ID">
                <value>` +
      uuid.v4() +
      `</value>
              </id>
              <namespace>DEMOGRAPHIC</namespace>
              <type>PERSON</type>
            </external_ref>
            <name>Dr. House</name>
          </composer>
          <context>
            <start_time>
              <value>20200712T131652,044+0300</value>
            </start_time>
            <setting>
              <value>primary medical care</value>
              <defining_code>
                <terminology_id>
                  <value>openehr</value>
                </terminology_id>
                <code_string>228</code_string>
              </defining_code>
            </setting>
            <other_context archetype_node_id="at0001" xsi:type="ITEM_TREE">
              <name>
                <value>Tree</value>
              </name>
              <items archetype_node_id="at0002" xsi:type="ELEMENT">
                <name xsi:type="DV_TEXT">
                  <value>Report ID</value>
                </name>
                <value xsi:type="DV_TEXT">
                  <value>` +
      instance.report_id +
      `</value>
                </value>
              </items>
              <items archetype_node_id="at0005" xsi:type="ELEMENT">
                <name xsi:type="DV_TEXT">
                  <value>Status</value>
                </name>
                <value xsi:type="DV_TEXT">
                  <value>` +
      instance.status +
      `</value>
                </value>
              </items>
              <!-- SLOT IN /context/other_context[at0001]/items[at0006] NOT PROCESSED -->
            </other_context>
          </context>
          <content archetype_node_id="openEHR-EHR-OBSERVATION.laboratory_test_result-coded.v0" xsi:type="OBSERVATION">
            <name>
              <value>Laboratory test result!</value>
            </name>
            <language>
              <terminology_id>
                <value>ISO_639-1</value>
              </terminology_id>
              <code_string>en</code_string>
            </language>
            <encoding>
              <terminology_id>
                <value>Unicode</value>
              </terminology_id>
              <code_string>UTF-8</code_string>
            </encoding>
            <subject xsi:type="PARTY_SELF" />
            <protocol archetype_node_id="at0004" xsi:type="ITEM_TREE">
              <name>
                <value>Tree</value>
              </name>
              <!-- SLOT IN /protocol[at0004]/items[at0017] NOT PROCESSED -->
              <items archetype_node_id="at0068" xsi:type="ELEMENT">
                <name xsi:type="DV_TEXT">
                  <value>Laboratory test identifier</value>
                </name>
                <value xsi:type="DV_IDENTIFIER">
                  <issuer>Some hospital</issuer>
                  <assigner>Some clinic</assigner>
                  <id>20692733</id>
                  <type>LOCALID</type>
                </value>
              </items>
              <!-- SLOT IN /protocol[at0004]/items[at0110] NOT PROCESSED -->
              <!-- SLOT IN /protocol[at0004]/items[at0117] NOT PROCESSED -->
            </protocol>
            <data archetype_node_id="at0001" xsi:type="HISTORY">
              <name>
                <value>Event Series</value>
              </name>
              <origin xsi:type="DV_DATE_TIME">
                <value>20200712T131652,076+0300</value>
              </origin>
              <events archetype_node_id="at0002" xsi:type="POINT_EVENT">
                <name>
                  <value>Any event</value>
                </name>
                <time xsi:type="DV_DATE_TIME">
                  <value>20200712T131652,077+0300</value>
                </time>
                <data archetype_node_id="at0003" xsi:type="ITEM_TREE">
                  <name>
                    <value>Tree</value>
                  </name>
                  <items archetype_node_id="at0005.1" xsi:type="ELEMENT">
                    <name xsi:type="DV_TEXT">
                      <value>! - Test name</value>
                    </name>
                    <value xsi:type="DV_CODED_TEXT">
                      <value>` +
      instance.test_name +
      `</value>
                      <defining_code>
                        <terminology_id>
                          <value>LOINC</value>
                        </terminology_id>
                        <code_string>1002501</code_string>
                      </defining_code>
                    </value>
                  </items>
                  <!-- SLOT IN /data[at0001]/events[at0002]/data[at0003]/items[at0065] NOT PROCESSED -->
                  <items archetype_node_id="at0073.1" xsi:type="ELEMENT">
                    <name xsi:type="DV_TEXT">
                      <value>! - Test status</value>
                    </name>
                    <value xsi:type="DV_CODED_TEXT">
                      <value>` +
      instance.test_status +
      `</value>
                      <defining_code>
                        <terminology_id>
                          <value>local</value>
                        </terminology_id>
                        <code_string>at0107</code_string>
                      </defining_code>
                    </value>
                  </items>
                  <items archetype_node_id="at0075" xsi:type="ELEMENT">
                    <name xsi:type="DV_TEXT">
                      <value>Test status timestamp</value>
                    </name>
                    <value xsi:type="DV_DATE_TIME">
                      <value>20200712T131652,086+0300</value>
                    </value>
                  </items>
                  <items archetype_node_id="at0077" xsi:type="ELEMENT">
                    <name xsi:type="DV_TEXT">
                      <value>Diagnostic service category</value>
                    </name>
                    <value xsi:type="DV_TEXT">
                      <value>` +
      instance.diagnostic_service_category +
      `</value>
                    </value>
                  </items>
                  <items archetype_node_id="at0100" xsi:type="ELEMENT">
                    <name xsi:type="DV_TEXT">
                      <value>Clinical information provided</value>
                    </name>
                    <value xsi:type="DV_TEXT">
                      <value>` +
      instance.clinical_information_provided +
      `</value>
                    </value>
                  </items>
                  <items archetype_node_id="openEHR-EHR-CLUSTER.laboratory_test_analyte-coded.v0" xsi:type="CLUSTER">
                    <name xsi:type="DV_TEXT">
                      <value>Laboratory test analyte!</value>
                    </name>
                    <items archetype_node_id="at0024.1" xsi:type="ELEMENT">
                      <name xsi:type="DV_TEXT">
                        <value>! - Analyte name</value>
                      </name>
                      <value xsi:type="DV_CODED_TEXT">
                        <value>` +
      instance.analyte_name +
      `</value>
                        <defining_code>
                          <terminology_id>
                            <value>LOINC</value>
                          </terminology_id>
                          <code_string>1008370</code_string>
                        </defining_code>
                      </value>
                    </items>
                    <items archetype_node_id="at0001" xsi:type="ELEMENT">
                      <name xsi:type="DV_TEXT">
                        <value>Analyte result</value>
                      </name>
                      <value xsi:type="DV_QUANTITY">
                        <magnitude>` +
      instance.analyte_result +
      `</magnitude>
                        <units>_no_constraint_defined_</units>
                      </value>
                    </items>
                    <items archetype_node_id="at0003" xsi:type="ELEMENT">
                      <name xsi:type="DV_TEXT">
                        <value>Comment</value>
                      </name>
                      <value xsi:type="DV_TEXT">
                        <value>` +
      instance.comment +
      `</value>
                      </value>
                    </items>
                    <items archetype_node_id="at0004" xsi:type="ELEMENT">
                      <name xsi:type="DV_TEXT">
                        <value>Reference range guidance</value>
                      </name>
                      <value xsi:type="DV_TEXT">
                        <value>` +
      instance.reference_range_guidance +
      `</value>
                      </value>
                    </items>
                    <items archetype_node_id="at0005.1" xsi:type="ELEMENT">
                      <name xsi:type="DV_TEXT">
                        <value>! - Analyte result status</value>
                      </name>
                      <value xsi:type="DV_CODED_TEXT">
                        <value>` +
      instance.analyte_result_status +
      `</value>
                        <defining_code>
                          <terminology_id>
                            <value>local</value>
                          </terminology_id>
                          <code_string>at0015</code_string>
                        </defining_code>
                      </value>
                    </items>
                    <items archetype_node_id="at0006" xsi:type="ELEMENT">
                      <name xsi:type="DV_TEXT">
                        <value>Analyte result status timestamp</value>
                      </name>
                      <value xsi:type="DV_DATE_TIME">
                        <value>20200712T131652,100+0300</value>
                      </value>
                    </items>
                    <!-- SLOT IN /items[at0014] NOT PROCESSED -->
                  </items>
                  <items archetype_node_id="at0057" xsi:type="ELEMENT">
                    <name xsi:type="DV_TEXT">
                      <value>Conclusion</value>
                    </name>
                    <value xsi:type="DV_TEXT">
                      <value>` +
      instance.conclusion +
      `</value>
                    </value>
                  </items>
                  <items archetype_node_id="at0098" xsi:type="ELEMENT">
                    <name xsi:type="DV_TEXT">
                      <value>Test diagnosis</value>
                    </name>
                    <value xsi:type="DV_TEXT">
                      <value>` +
      instance.test_diagnosis +
      `</value>
                    </value>
                  </items>
                  <!-- SLOT IN /data[at0001]/events[at0002]/data[at0003]/items[at0118] NOT PROCESSED -->
                  <items archetype_node_id="at0101" xsi:type="ELEMENT">
                    <name xsi:type="DV_TEXT">
                      <value>Comment</value>
                    </name>
                    <value xsi:type="DV_TEXT">
                      <value>` +
      instance.comment_diagnosis +
      `</value>
                    </value>
                  </items>
                </data>
                <state archetype_node_id="at0112" xsi:type="ITEM_TREE">
                  <name>
                    <value>Tree</value>
                  </name>
                  <!-- SLOT IN /data[at0001]/events[at0002]/state[at0112]/items[at0114] NOT PROCESSED -->
                </state>
              </events>
            </data>
          </content>
        </data>
        <lifecycle_state>
          <value>complete</value>
          <defining_code>
            <terminology_id>
              <value>openehr</value>
            </terminology_id>
            <code_string>532</code_string>
          </defining_code>
        </lifecycle_state>
      </version>
    </versions>`;
    let params = new HttpParams().set('auditCommitter', 'Dr. Hayle, Meron');
    return this.http
      .post(
        this.serverUrl +
          'rest/v1/ehrs/e5f3fc74-edbd-4dc1-9537-f8f037383968/compositions',
        template,
        {
          headers: this.headers,
          params: params,
        }
      )
      .toPromise()
      .then((res) => res)
      .catch((err) => err);
  }

  fetchMedicalDatas(ehrUuid) {
    return this.http
      .get(
        this.serverUrl + 'rest/v1/compositions?format=json&ehrUid=' + ehrUuid,
        {
          headers: this.headers,
        }
      )
      .toPromise()
      .then((res) => res)
      .catch((err) => err);
  }
  fetchMedicalData(medicalUuid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/text',
      Accept: 'application/xml',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGNhYm9sYWJzLmNvbSIsImV4dHJhZGF0YSI6eyJvcmdfdWlkIjoiZTlkMTMyOTQtYmNlNy00NGU3LTk2MzUtOGU5MDZkYTBjOTE0In0sImlzc3VlZF9hdCI6IjIwMjAtMDctMTRUMTk6MDE6NTguNDUyWiIsImV4cGlyZXNfYXQiOiIyMDIwLTA3LTE1VDE5OjAxOjU4LjQ1MloifQ.DbzmR-Ii60mwENO-5ZENYuUzy0JudTqbPlFs1EqYBpM',
    });
    return this.http
      .get(
        this.serverUrl + 'rest/v1/compositions/' + medicalUuid + '?format=html',
        {
          headers: headers,
          responseType: 'text',
        }
      )
      .toPromise()
      .then((res) => res)
      .catch((err) => err);
  }
}
