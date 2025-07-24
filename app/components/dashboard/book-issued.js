import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class BookIssued extends Component {
    @tracked studentInputs = {};

    @action
    updateStudentId(bookId, event) {
        this.studentInputs[bookId] = event.target.value;
    }

    @action 
    assignBookToStudent(book) {
        const studentId = this.studentInputs[book.id];
        if(!studentId) return alert('Enter student Id');

        if(!book.issuedTo) {
            book.issuedTo = [];
        }

        if(!book.issuedTo.includes(studentId)) {
            book.issuedTo.push(studentId);
        }

        this.studentInputs[book.id] = '';
    }
}
