import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DashboardTotalStudent extends Component {
    @service studentStore;

    @tracked selectedStudent = null;
    @tracked requests = [];
    @tracked returnRequests = [];

    constructor() {
        super(...arguments);
        this.loadRequests();
    }

    loadRequests() {
        const stored = localStorage.getItem('requests');
        this.requests = stored ? JSON.parse(stored) : [];

        const returnStored = localStorage.getItem('returns');
        this.returnRequests = returnStored ? JSON.parse(returnStored) : [];
    }

    get allStudents() {
        return this.studentStore.students || [];
    }

    @action
    selectStudent(student) {
        this.selectedStudent = student;

        this.requests = this.requests.map((r) => {
            if(r.studentId === student.id && r.status === 'pending') {
                return { ...r, status: 'seen'}
            }
            return r;
        });

        this.updateStorage();
    }

    @action
    hasPendingRequest(studentId) {
        return this.requests.some((r) => r.studentId === studentId && (r.status === 'pending' || r.status === 'seen'));
    }

    @action
    hasReturnRequest(studentId) {
        return this.returnRequests.some((r) => r.studentId === studentId);
    }

    @action
    getStudentRequest(studentId) {
        return this.requests.find((r) => r.studentId === studentId && (r.status === 'pending' || r.status === 'seen'));
    }

    @action
    updateStorage() {
        localStorage.setItem('requests', JSON.stringify(this.requests));
    }

    @action
    approveRequest(request) {

        request.status = 'approved';
        this.requests = this.requests.filter(r => r !== request);
        this.updateStorage();

        const books = JSON.parse(localStorage.getItem('books')) || [];
        const updatedBooks = books.map(book => {
            if (book.id === request.bookId) {
                const issuedCount = (book.issuedCount || 0) + 1;
                return {
                    ...book,
                    isIssued: true,
                    issuedTo: request.studentId,
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
                    issuedCount,
                    isRequested: false,
                    requestedBy: null
                };
            }
            return book;
        });

        localStorage.setItem('books', JSON.stringify(updatedBooks));
        alert(`Book approved for ${this.selectedStudent?.name}`);
    }

    @action
    denyRequest(request) {
        this.requests = this.requests.filter(r => r !== request);
        this.updateStorage();

        const books = JSON.parse(localStorage.getItem('books')) || [];
        const updatedBooks = books.map(book => {
            if (book.id === request.bookId) {
                return {
                    ...book,
                    isRequested: false,
                    requestedBy: null
                };
            }
            return book;
        });

        localStorage.setItem('books', JSON.stringify(updatedBooks));
        alert(`Request denied for ${this.selectedStudent?.name}`);
    }

    @action
    getIssuedBooks(studentId) {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        return books.filter(book => book.issuedTo === studentId);
    }

    get booksSummary() {
        const books = JSON.parse(localStorage.getItem('books')) || [];

        const total = books.length;
        const issued = books.filter(book => book.issuedCount > 0).length;
        const available = books.filter(book => (book.count || 1) > (book.issuedCount || 0)).length;

        return { total, issued, available, books }
    }

    @action
    approveReturn(request) {
        const books = JSON.parse(localStorage.getItem('books')) || [];

        const updatedBooks = books.map(book => {
            if(book.id === request.bookId && book.issuedTo === request.studentId) {
                const issuedCount = Math.max((book.issuedCount || 1) - 1 ,0);
                return {
                    ...book,
                    isIssued: false,
                    issuedTo: null,
                    dueDate: null,
                    issuedCount
                };
            }
            return book;
        });

        localStorage.setItem('books', JSON.stringify(updatedBooks));
        this.returnRequests = this.returnRequests.filter(r => r != request);
        localStorage.setItem('returns', JSON.stringify(this.returnRequests));

        alert(`Book "${request.bookTitle}" returned by ${this.selectedStudent?.name}`);
    }

    @action
    denyReturn(request) {
        this.returnRequests = this.returnRequests.filter(r => r !== request);
        localStorage.setItem('returns', JSON.stringify(this.returnRequests));
    }
}
