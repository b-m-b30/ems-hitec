import { Component } from '@angular/core';
import { QualificationsFilter } from "./qualifications-filter/qualifications-filter";
import { QualificationsList } from "./qualifications-list/qualifications-list";

@Component({
  selector: 'app-ems-qualifications',
  imports: [QualificationsFilter, QualificationsList],
  templateUrl: './ems-qualifications.html',
  styleUrl: './ems-qualifications.css',
})
export class EmsQualifications {

}
