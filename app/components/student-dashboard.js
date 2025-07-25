import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { books as defaultBooks } from '../data/books';

export default class StudentDashboard extends Component {
    @service session;
    @service router;

    @tracked sortBy = 'title';
    @tracked books = [];

    constructor() {
        super(...arguments);

        const storedBooks = localStorage.getItem('books');
        this.books = storedBooks ? JSON.parse(storedBooks) : [...defaultBooks];
    }

    get totalIssued() {
        return this.books.filter(book => book.issuedTo === this.session.currentUser.id);
    }

    get overDueBooks() {
        const today = new Date();
        return this.issuedBooks
        .filter(book => book.dueDate && new Date(book.dueDate) < today);
    }

    get student() {
        return this.session.currentUser?.name;
    }

    get sortedBooks() {
        return this.books
        .filter(book => !book.isIssued)
        .slice()
        .sort((a,b) => {
            const key = this.sortBy;

            const aValue = a[key]?.toLowerCase() || '';
            const bValue = b[key]?.toLowerCase() || '';

            return aValue.localeCompare(bValue);
        });
    }

    get issuedBooks() {
        const today = new Date();
        return this.books
        .filter(book => book.isIssued && book.issuedTo === this.session.currentUser.id)
        .map(book => ({
            ...book, 
            isOverdue: book.dueDate ? new Date(book.dueDate) < today : false
        }));
    }

    get availableBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];

        return books.filter(book => {
            const total = book.count || 0;
            const issued = book.issuedCount || 0;
            return total > issued;
        });
    }

    @action
    changeSort(event) {
        this.sortBy = event.target.value;
    }

    @action
    requestBook(book) {
        if (book.issuedCount >= book.count) {
            alert(`${book.title} is currently unavailable.`);
            return;
        }

        const updatedBooks = this.books.map(b => {
            if (b.id === book.id) {
                return {
                    ...b,
                    isRequested: true,
                    requestedBy: this.session.currentUser.id
                };
            }
            return b;
        });

        this.books = updatedBooks;
        localStorage.setItem('books', JSON.stringify(this.books));
        alert(`${book.title} has been requested.`);

        const existingRequests = JSON.parse(localStorage.getItem('requests')) || [];
        existingRequests.push({
            studentId: this.session.currentUser.id,
            bookId: book.id,
            bookTitle: book.title,
            status: 'pending'
        });
        localStorage.setItem('requests', JSON.stringify(existingRequests));
    }

    @action
    returnBook(book) {
        const existingReturns  = JSON.parse(localStorage.getItem('returns')) || [];
        existingReturns .push({
            studentId: this.session.currentUser.id,
            bookId: book.id,
            bookTitle: book.title,
            status: 'pending'
        });
        localStorage.setItem('returns', JSON.stringify(existingReturns));
        alert(`Return request for "${book.title}" has been sent.`);
    }
}
