import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DashboardTotalStudent extends Component {
    @tracked selectedStudent = null;

    get requests() {
        return this.args.requests || [];
    }

    @action
    selectedStudent(user) {
        this.selectedStudent = user;
    }

    hasPendingRequest(studentId) {
        return this.requests.some((r) => r.studentId === studentId && r.status === 'pending');
    }

    getStudentRequest(studentId) {
        return this.requests.find((r) => r.studentId === studentId && r.status === 'pending');
    }

    @action
    approveRequest(request) {
        request.status = 'approved';
        alert(`Book approved for ${this.selectedStudent.name}`);
    }

    @action
    denyRequest(request) {
        request.status = 'rejected';
        alert(`Request denied for ${this.selectedStudent.name}`);
    }
}
