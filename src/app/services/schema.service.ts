import { Injectable } from '@angular/core';
import { CourseData } from '../kurser/kurser.component';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private storageKey = 'ramschema';

  constructor() {}

  // Lägg till kurs till localStorage
  addCourse(course: CourseData) {
    const currentSchema = this.getCourses();
    currentSchema.push(course);
    localStorage.setItem(this.storageKey, JSON.stringify(currentSchema));
  }

  // Hämta kurser från localStorage
  getCourses(): CourseData[] {
    const storedSchema = localStorage.getItem(this.storageKey);
    return storedSchema ? JSON.parse(storedSchema) : [];
  }

  // Ta bort kurs från localStorage
  removeCourse(courseCode: string) {
    let currentSchema = this.getCourses();
    currentSchema = currentSchema.filter(course => course.courseCode !== courseCode);
    localStorage.setItem(this.storageKey, JSON.stringify(currentSchema));
  }
}
