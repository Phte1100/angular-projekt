import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseData } from '../kurser/kurser.component';

// Dekorerar klassen som en injicerbar tjänst som finns tillgänglig över hela applikationen.
@Injectable({
    providedIn: 'root',
})
export class ListService {
    url: string = 'assets/members.json';

    constructor(private http: HttpClient) {}

    // Metod för att hämta kurser från en extern JSON-fil över HTTP, returnerar en Observable av CourseData-arrayer.
    getCourses(): Observable<CourseData[]> {
        return this.http.get<CourseData[]>('https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json');
      }
}