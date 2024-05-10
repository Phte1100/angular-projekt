import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SchemaService } from '../services/schema.service';
import { CourseData } from '../kurser/kurser.component';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-ramschema',
  templateUrl: './ramschema.component.html',
  styleUrls: ['./ramschema.component.scss'],
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatTooltipModule, MatExpansionModule
  ]
})
export class RamschemaComponent implements OnInit {
  courses: CourseData[] = [];

  constructor(private schemaService: SchemaService) {}

  ngOnInit() {
    this.courses = this.schemaService.getCourses();
  }

  get courseCount(): number {
    return this.courses.length;
  }

  get totalPoints(): number {
    return this.courses.reduce((acc, course) => acc + course.points, 0);
  }


  removeCourse(courseCode: string) {
    this.schemaService.removeCourse(courseCode);
    this.courses = this.schemaService.getCourses();  // Uppdatera listan efter borttagning
  }
}



