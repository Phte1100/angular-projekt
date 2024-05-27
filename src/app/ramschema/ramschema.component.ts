import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SchemaService } from '../services/schema.service';
import { CourseData } from '../kurser/kurser.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-ramschema',
  templateUrl: './ramschema.component.html',
  styleUrls: ['./ramschema.component.scss'],
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatTooltipModule, MatExpansionModule, MatSortModule, MatSnackBarModule, MatIconModule
  ]
})
export class RamschemaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'remove'];
  dataSource = new MatTableDataSource<CourseData>();
  courses: CourseData[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private schemaService: SchemaService, private _liveAnnouncer: LiveAnnouncer, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.courses = this.schemaService.getCourses();
    this.dataSource.data = this.courses; // Tilldela data direkt till dataSource
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  get courseCount(): number {
    return this.courses.length;
  }

  get totalPoints(): number {
    return this.courses.reduce((acc, course) => acc + course.points, 0);
  }

  removeCourse(courseCode: string) {
    const course = this.courses.find(c => c.courseCode === courseCode);
    if (course) {
      this.schemaService.removeCourse(courseCode);
      this.courses = this.schemaService.getCourses();  // Uppdatera listan efter borttagning
      this.dataSource.data = this.courses; // Uppdatera dataSource efter borttagning
      this.snackBar.open(`${course.courseName} borttaget ur ramschemat`, 'Stäng', {
        duration: 2000,
      });
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}



