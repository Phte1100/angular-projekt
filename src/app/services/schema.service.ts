import { Injectable } from '@angular/core';
import { CourseData } from '../kurser/kurser.component';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private readonly localStorageKey = 'ramschema';

  constructor() {}

  // Metod för att hämta alla kurser från localStorage.
  getCourses(): CourseData[] {
    const storedCourses = localStorage.getItem(this.localStorageKey);
    return storedCourses ? JSON.parse(storedCourses) : [];
  }

  // Metod för att lägga till en kurs i localStorage, om den inte redan finns.
  addCourse(course: CourseData) {
    const courses = this.getCourses();
    if (!this.courseExists(course.courseCode)) {
      courses.push(course);
      localStorage.setItem(this.localStorageKey, JSON.stringify(courses));
    }
  }

 // Metod för att ta bort en kurs från localStorage baserat på kurskod
  removeCourse(courseCode: string) {
    let courses = this.getCourses();
    courses = courses.filter(course => course.courseCode !== courseCode);
    localStorage.setItem(this.localStorageKey, JSON.stringify(courses));
  }

  // Kontrollerar om en kurs redan finns i localStorage
  public courseExists(courseCode: string): boolean {
    const courses = this.getCourses();
    return courses.some(course => course.courseCode === courseCode);
  }
}
