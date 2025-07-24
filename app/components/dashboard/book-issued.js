import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BookIssued extends Component {
    @service('book-store') bookStore;
    @service('student-store') studentStore;

    @tracked studentInputs = {};
    @tracked isStudentModalOpen = false;

    @tracked newStudentId = '';
    @tracked newStudentName = '';

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
        if(!studentId) {
            alert('Enter student Id');
            return;
        }

        this.bookStore.assignBook(bookId, studentId);
        this.studentInputs[bookId] = '';
    }

    @action 
    toggleStudentModal() {
        this.isStudentModalOpen = !this.isStudentModalOpen;
        this.newStudentId = '';
        this.newStudentName = '';
    }

    @action
    updateStudentIdField(event) {
        this.newStudentId = event.target.value;
    }

    @action
    updateStudentNameField(event) {
        this.newStudentName = event.target.value;
    }

    @action 
    addStudent() {
        if (!this.newStudentId || !this.newStudentName) {
            alert('Please enter all student details');
            return;
        }

        this.studentStore.addStudent({
            id: this.newStudentId,
            name: this.newStudentName,
            role: 'student',
        });

        this.toggleStudentModal();
    }
}
