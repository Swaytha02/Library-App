import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class Dashboard extends Component {
    @service('router') router;

    get overDueBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const today = new Date().toISOString().split('T')[0];

        return books.filter(book => 
            book.isIssued && book.dueDate && book.dueDate < today
        );
    }
}
