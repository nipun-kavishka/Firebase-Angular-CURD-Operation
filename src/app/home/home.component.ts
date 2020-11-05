import { Component, OnInit } from '@angular/core';
import { Student } from '../interfaces/student_info';
import { DataServiceService } from '../services/data-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public students: Student[] = [];

  constructor(private dataservice: DataServiceService) {
  }

  ngOnInit(): void {
  }

  loadData(){
   this. dataservice.getStudents().then((result: Student[]) => {
      this.students = result;
    });
  }

  addData(myName: string, age: number) {
    var myStudent: Student = {
      name: myName,
      age: age
    };
    this.dataservice.createStudent(myStudent);
  }
}
