import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SchemaService } from '../services/schema.service';
import { CourseData } from '../kurser/kurser.component';

@Component({
  selector: 'app-ramschema',
  templateUrl: './ramschema.component.html',
  styleUrls: ['./ramschema.component.scss'],
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatTooltipModule
  ]
})
export class RamschemaComponent implements OnInit {
  courses: CourseData[] = [];

  constructor(private schemaService: SchemaService) {}

  ngOnInit() {
    this.courses = this.schemaService.getCourses();
  }

  removeCourse(courseCode: string) {
    this.schemaService.removeCourse(courseCode);
    this.courses = this.schemaService.getCourses();  // Uppdatera listan efter borttagning
  }
}
