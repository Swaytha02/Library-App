import Component from '@glimmer/component';

export default class OverdueBooks extends Component {
    isDateExpired(dueDate) {
        return dueDate && (new Date(dueDate) < new Date());
    }
}
