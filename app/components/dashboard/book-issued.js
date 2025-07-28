import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BookIssued extends Component {
    @service('book-store') bookStore;
    @service('student-store') studentStore;

    @tracked studentInputs = {};
    @tracked isStudentModalOpen = false;

    @tracked newStudentName = '';
    @tracked newStudentUsername = '';
    @tracked newStudentPassword = '';

    get books() {
        return this.bookStore.books;
    }

    @action
    updateStudentId(bookId, event) {
        this.studentInputs[bookId] = event.target.value;
    }

    @action 
    assignBookToStudent(bookId) {
        const studentId = this.studentInputs[bookId];
        const studentExists = this.studentStore.students.some(s => s.id === studentId);
        if (!studentExists) {
            alert('Invalid student ID');
            return;
        }

        this.bookStore.assignBook(bookId, studentId);
        this.studentInputs[bookId] = '';
    }

    @action 
    toggleStudentModal() {
        this.isStudentModalOpen = !this.isStudentModalOpen;
        this.newStudentName = '';
        this.newStudentUsername = '';
        this.newStudentPassword = '';
    }

    @action
    updateStudentNameField(event) {
        this.newStudentName = event.target.value;
    }

    @action
    updateStudentUsernameField(event) {
        this.newStudentUsername = event.target.value;
    }

    @action
    updateStudentPassword(event) {
        this.newStudentPassword = event.target.value;
    }

    @action 
    addStudent() {
        if (!this.newStudentName || !this.newStudentUsername || !this.newStudentPassword) {
            alert('Please enter all student details');
            return;
        }

        this.studentStore.addStudent({
            id: `stu${this.studentStore.students.length + 1}`,
            name: this.newStudentName,
            password: this.newStudentPassword,
            role: 'student',
            username: this.newStudentUsername,
        });

        this.toggleStudentModal();
    }
}
