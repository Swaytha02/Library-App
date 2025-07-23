import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { books } from '../data/books';

export default class StudentDashboard extends Component {
    @service session;
    @service router;
    @tracked sortBy = 'title';
    @tracked books = [];

    get totalIssued() {
        return books.filter(book => book.issuedTo === this.session.currentUser.id);
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
        return books
        .filter(book => !book.isIssued)
        .slice()
        .sort((a,b) => {
            const key = this.sortBy;

            if(key === "dueDate") {
                const aDate = a.dueDate ? new Date(a.dueDate ) : null;
                const bDate = b.dueDate ? new Date(b.dueDate ) : null;

                if(!aDate && !bDate) return 0;
                if(!aDate) return 1;
                if(!bDate) return -1;

                return aDate - bDate;
            }

            const aValue = a[key]?.toLowerCase() || '';
            const bValue = b[key]?.toLowerCase() || '';

            return aValue.localeCompare(bValue);
        });
    }

    get issuedBooks() {
        const today = new Date();

        return books
        .filter(book => book.isIssued && book.issuedTo === this.session.currentUser.id)
        .map(book => ({
            ...book, 
            isOverdue: book.dueDate ? new Date(book.dueDate) < today : false
        }));
    }

    @action
    changeSort(event) {
        this.sortBy = event.target.value;
    }

    @action
    async requestBook(book) {
        if(!book.isIssued) {
            book.isIssued = true;
            book.issuedTo = this.session.currentUser.id;
            book.dueDate = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10); 
            
            this.books = [...books]; 
            
            localStorage.setItem('books', JSON.stringify(this.books));
        } else {
            alert("This book is already issued.");
        }
    }

    @action
    logOut() {
        this.session.logOut();
        this.router.transitionTo('login');
    }
}
