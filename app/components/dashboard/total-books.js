import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TotalBooks extends Component {
    @service('book-store') bookStore;
    
    @tracked isModalOpen = false;
    @tracked title = '';
    @tracked author = '';
    @tracked count = 1;

    get books() {
        return this.bookStore.books;
    }

    get nextId() {
        return this.books.length ? Math.max(...this.books.map(b => b.id)) + 1 : 1;
    }

    @action
    toggleModal() {
        this.isModalOpen = !this.isModalOpen;
    }

    @action 
    updateTitle(e) {
        this.title = e.target.value;
    }

    @action 
    updateAuthor(e) {
        this.author = e.target.value;
    }

    @action 
    updateCount(e) {
        this.count = e.target.value;
    }

    @action 
    addBook() {
        if(!this.title || !this.author || !this.count) {
            alert('Please fill all fields');
            return;
        }

        const newBook = {
            id: this.nextId,
            title: this.title,
            author: this.author,
            count: parseInt(this.count),
            issuedCount: 0,
            issuedTo: [],
        };

        this.bookStore.addBook(newBook);

        this.title = '';
        this.author = '';
        this.count = 1;
        this.toggleModal();
    }
}
