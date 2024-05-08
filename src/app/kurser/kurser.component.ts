/*

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ListService} from '../services/list.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


export interface CourseData {
  courseCode: string;
  courseName: string;
  points: number;
  subject: string;
}

@Component({
  selector: 'app-kurser',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './kurser.component.html',
  styleUrl: './kurser.component.scss'
})

export class KurserComponent implements AfterViewInit {

  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject'];
  dataSource = new MatTableDataSource<CourseData>();
  courses: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getCourses().subscribe((data: CourseData[]) => {
      this.dataSource.data = data;  // Tilldela data direkt till dataSource
      this.initDataSource();  // Ny metod för att konfigurera paginator och sort
    });
  }
  
  initDataSource() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
*/

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ListService} from '../services/list.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';


export interface CourseData {
  courseCode: string;
  courseName: string;
  points: number;
  subject: string;
}

@Component({
  selector: 'app-kurser',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    FormsModule, ReactiveFormsModule, MatSelectModule, CommonModule
  ],
  templateUrl: './kurser.component.html',
  styleUrls: ['./kurser.component.scss']
})
export class KurserComponent implements AfterViewInit {
  subjectControl = new FormControl('');  // Se till att denna rad är korrekt definierad
  subjectList: string[] = [];

  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject'];
  dataSource = new MatTableDataSource<CourseData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getCourses().subscribe((data: CourseData[]) => {
      this.dataSource.data = data;
      this.initDataSource();
      this.setSubjects(data);
    });

    this.subjectControl.valueChanges.subscribe(value => this.applySubjectFilter(value!));
  }

  initDataSource() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}