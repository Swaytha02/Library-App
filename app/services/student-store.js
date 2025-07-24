import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { users as initialStudents} from '../data/users';

export default class StudentStoreService extends Service {
    @tracked students = [];
    
    constructor() {
        super(...arguments);
        this.loadStudents();
    }

    loadStudents() {
        const stored = localStorage.getItem('students');
        if (stored) {
            this.students = JSON.parse(stored);
        } else {
            this.students = initialStudents.filter(s => s.role === 'student');
            this.saveStudents(); 
        }
    }

    saveStudents() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    addStudent(student) {
        if(this.students.some(s => s.id === student.id)) {
            alert('Student ID already exists');
            return;
        }

        this.students = [...this.students, student];
        this.saveStudents();
    }

    getStudentById(id) {
        return this.students.find(s => s.id === id);
    }

    updateStudent(updatedStudent) {
        this.students = this.students.map(student => 
            student.id === updatedStudent.id ? updatedStudent : student
        );
        this.saveStudents();
    }
}
