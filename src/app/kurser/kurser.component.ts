import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListService } from '../services/list.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SchemaService } from '../services/schema.service';
import { MatIconModule } from '@angular/material/icon';

// Definiera interfacen för CourseDara
export interface CourseData {
  courseCode: string;
  courseName: string;
  points: number;
  subject: string;
}

@Component({
  selector: 'app-kurser',
  standalone: true,
  imports: [ // Importera moduler som behövs för komponenten
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    FormsModule, ReactiveFormsModule, MatSelectModule, CommonModule, MatTooltipModule, MatButtonModule, MatSnackBarModule, MatIconModule 
  ],
  templateUrl: './kurser.component.html',
  styleUrls: ['./kurser.component.scss']
})
export class KurserComponent implements AfterViewInit {
  subjectControl = new FormControl(''); // Kontroll för att hantera ämnesfilter
  subjectList: string[] = []; // Lista för att lagra unika ämnen

  // Definiera vilka kolumner som ska visas i tabellen
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'button'];
  dataSource = new MatTableDataSource<CourseData>();

  // Länk till paginator och sorteringskomponenter
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private listService: ListService, private schemaService: SchemaService, private snackBar: MatSnackBar) {}

  // Prenumerera på kurser från ListService och initiera datatabellen
  ngOnInit() {
    this.listService.getCourses().subscribe((data: CourseData[]) => {
      this.dataSource.data = data;
      this.initDataSource();
      this.setSubjects(data);
    });

    this.subjectControl.valueChanges.subscribe(value => this.applySubjectFilter(value!));
  }

  // Initialisera paginator och sorteringsfunktioner
  initDataSource() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Extrahera och sätt unika ämnen från kursdata
  setSubjects(data: CourseData[]) {
    const subjects = new Set(data.map(course => course.subject));
    this.subjectList = Array.from(subjects);
  }

  applySubjectFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Tillämpa filter på alla kolumner baserat på input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Lägg till en kurs i ramschemat och visa feedback
  addCourseToSchedule(course: CourseData) {
    if (this.schemaService.courseExists(course.courseCode)) {
      this.snackBar.open(`${course.courseName} är redan tillagt i ramschemat`, 'Stäng', {
        duration: 2000,
      });
    } else {
      this.schemaService.addCourse(course);
      this.snackBar.open(`${course.courseName} tillagt i ramschemat`, 'Stäng', {
        duration: 2000,
      });
    }
  }
}
