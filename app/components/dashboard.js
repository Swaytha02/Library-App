import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class Dashboard extends Component {
    @service router;

    get overDueBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const today = new Date().toISOString().split('T')[0];

        return books.flatMap(book => 
            (book.issuedInfo || [])
            .filter(info => info.dueDate && info.dueDate < today)
            .map(info => ({
                ...book,
                studentId: info.studentId,
                dueDate: info.dueDate
            }))
        );
    }
}
