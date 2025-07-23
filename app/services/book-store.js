import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { books as initialBooks } from '../data/books';

export default class BookStoreService extends Service {
    @tracked books = [...initialBooks];

    get availableBooks() {
        return this.books.filter(book => book.issuedCount < book.count);
    }

    get issuedBooks() {
        return this.books.filter(book => book.issuedCount > 0);
    }

    getBookById(id) {
        return this.books.find(book => book.id === id);
    }

    requestBook(bookId, studentId) {
        let updated = false;
        this.books = this.books.map(book => {
            if (book.id === bookId && book.issuedCount < book.count) {
                updated = true;
                return {
                    ...book,
                    issuedCount: book.issuedCount + 1
                };
            }
            return book;
        });
        return updated;
    }

    returnBook(bookId) {
        this.books = this.books.map(book => {
        if (book.id === bookId && book.issuedCount > 0) {
            return {
            ...book,
            issuedCount: book.issuedCount - 1
            };
        }
        return book;
        });
    }

    updateBook(updatedBook) {
        this.books = this.books.map(book => 
            book.id === updatedBook.id ? updatedBook : book
        );
    }

    getTotalCount(title) {
        const book = this.books.find(b => b.title === title);
        return book ? book.count : 0;
    }
}
