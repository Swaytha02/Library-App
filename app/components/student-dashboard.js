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

    get student() {
        return this.session.currentUser?.name;
    }

    get issuedBooks() {
        const today = new Date();
        
        return this.books
        .map(book => {
            const studentEntries = (book.issuedInfo || [])
            .filter(entry => entry.studentId === this.session.currentUser.id)
            .map(entry => ({
                ...book,
                issuedInfo: [{
                    ...entry,
                    isOverdue: entry.dueDate ? new Date(entry.dueDate) < today : false
                }]
            }));
            return studentEntries;
        })
        .flat();
    }

    get totalIssued() {
        return this.books.filter(book =>
            book.issuedInfo?.some(info => info.studentId === this.session.currentUser.id)
        );
    }

    get overDueBooks() {
        return this.issuedBooks.filter(book => book.issuedInfo?.[0]?.isOverdue);
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

    get availableBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];

        return books.filter(book => {
            const issued = book.issuedInfo?.length || 0;
            const alreadyIssuedToUser = book.issuedInfo?.some(
              entry =>  entry.studentId === this.session.currentUser.id 
            );
            return book.count > issued && !alreadyIssuedToUser;
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
