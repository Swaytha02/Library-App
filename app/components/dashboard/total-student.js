import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DashboardTotalStudent extends Component {
    @tracked selectedStudent = null;
    @tracked requests = [];

    constructor() {
        super(...arguments);
        this.loadRequests();
    }

    loadRequests() {
        const stored = localStorage.getItem('requests');
        this.requests = stored ? JSON.parse(stored) : [];
    }

    get allUsers() {
        return this.args.users || [];
    }

    @action
    selectStudent(user) {
        this.selectedStudent = user;
    }

    hasPendingRequest(studentId) {
        return this.requests.some((r) => r.studentId === studentId && r.status === 'pending');
    }

    getStudentRequest(studentId) {
        return this.requests.find((r) => r.studentId === studentId && r.status === 'pending');
    }

    updateStorage() {
        localStorage.setItem('requests', JSON.stringify(this.requests));
    }

    @action
    approveRequest(request) {
        this.requests = this.requests.map((r) => 
            r === request ? {...r, status: 'approved'} : r
        );
        this.updateStorage();
        alert(`Book approved for ${this.selectedStudent?.name}`);
    }

    @action
    denyRequest(request) {
        this.requests = this.requests.map((r) => 
            r === request ? {...r, status: 'rejected'} : r
        );
        this.updateStorage();
        alert(`Request denied for ${this.selectedStudent?.name}`);
    }
}
