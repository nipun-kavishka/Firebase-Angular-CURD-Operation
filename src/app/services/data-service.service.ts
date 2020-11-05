import { Injectable } from '@angular/core';
//import firebase modules 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
//import rxjs operators
import { map } from 'rxjs/operators';
//import custom Student interface. (The structure of the json object)
import { Student } from '../interfaces/student_info';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  //this is the root of the data path in firebase database
  //you can change this whatever you want
  //eg: teacher, subject_enrollment
  private rootPath = 'students';

  studentRef: AngularFireList<Student> = null;

  constructor(private db: AngularFireDatabase) {
    this.studentRef = db.list(this.rootPath);
  }

  /**
   * create data entry in the firebase database
   * the key will be generate by the firebase itself
   * also this key will be an unique key for each  the data
   * @param student 
   */
  createStudent(student: Student): void {
    this.studentRef.push(student);
  }

  //create student with custom key
  createStudentWithKey(student: Student, key: string): void {
    this.studentRef.set(key, student);
  }

  updateCustomer(key: string, value: any): Promise<void> {
    return this.studentRef.update(key, value);
  }

  /**
   * Delete an entry of the given key from the defined root
   * @param key sholud be provide by the user
   */
  deleteCustomer(key: string): Promise<void> {
    return this.studentRef.remove(key);
  }

  getCustomersList(): AngularFireList<Student> {
    return this.studentRef;
  }

  /**
   * Delete entire root from the firebase database
   */
  deleteAll(): Promise<void> {
    return this.studentRef.remove();
  }

  /**
   * get all the students data from the firebase database
   * all the data will return as an array
   */
  getStudents() {

    return new Promise((resolve, reject) => {

      //create empty array of students
      var students: Array<Student> = new Array();

      this.getCustomersList().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(items => {

        //iterate each item
        items.forEach(element => {
          //print each key of the element in the student list
          console.log(element.key);

          var std: Student = {
            name: element.name,
            age: element.age
          }
          students.push(std);
        });

        //*uncomment this if you want to check length of the array
        //console.log(students.length);


      });
      //now return student array as promise
      resolve(students)

    });

  }



}
