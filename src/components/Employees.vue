<template>
    <b-container class="p-0">
        <b-button to="/" class="mt-3">Home</b-button>
        <h1 class="text-center pt-3">{{ companyName }} Employees</h1>
        <b-row>
            <b-col class="col-1">
                <b-button @click="getAddModal">Create</b-button>
            </b-col>
            <b-col class="col-1">
                <b-button @click="getEmployeeInfo">Edit</b-button>
            </b-col>
            <b-col class="col-1">
                <b-button
                    v-b-modal.delete-modal
                    :disabled="selectedEmployee === {}"
                    >Delete</b-button
                >
            </b-col>
        </b-row>
        <b-row class="py-3">
            <b-col>
                <b-table
                    :fields="employeeFields"
                    :items="employees"
                    bordered
                    selectable
                    select-mode="single"
                    class="schedule-table"
                    head-variant="dark"
                    @row-selected="onRowSelected"
                ></b-table>
            </b-col>
        </b-row>
        <b-modal
            id="add-modal"
            ref="add-modal"
            centered
            :title="`Add employee`"
        >
            <b-container fluid>
                <b-form>
                    <b-form-group label="First Name" label-for="firstName">
                        <b-form-input
                            v-model="newEmployee.firstName"
                            id="firstName"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Last Name" label-for="lastName">
                        <b-form-input
                            v-model="newEmployee.lastName"
                            id="lastName"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Email" label-for="email">
                        <b-form-input
                            v-model="newEmployee.email"
                            id="email"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Address" label-for="address">
                        <b-form-input
                            v-model="newEmployee.address"
                            id="address"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-checkbox v-model="newEmployee.isAdmin">
                        Is Admin
                    </b-form-checkbox>
                </b-form>
            </b-container>
            <template v-slot:modal-footer>
                <b-button variant="success" @click.prevent="addEmployee()"
                    >Add</b-button
                >
            </template>
        </b-modal>
        <b-modal
            id="delete-modal"
            ref="delete-modal"
            centered
            model-ok="Delete"
            title="Confirm deletion"
        >
            <span class="my-4 bold"
                >Are you sure you want to delete
                {{ selectedEmployee.firstName }} {{ selectedEmployee.lastName }}?</span
            >
            <template v-slot:modal-footer="{ Delete, cancel }">
                <b-button variant="danger" @click="deleteEmployee()">Delete</b-button>
                <b-button @click="cancel()">Cancel</b-button>
            </template>
        </b-modal>
        <b-modal
            id="edit-modal"
            ref="edit-modal"
            centered
            model-ok="Edit"
            title="Edit Employee"
        >
            <b-form>
                <b-form-group label="First Name" label-for="form-fname">
                    <b-form-input
                        v-model="selectedEmployee.firstName"
                        id="form-fname"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Last Name" label-for="form-lname">
                    <b-form-input
                        v-model="selectedEmployee.lastName"
                        id="form-lname"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Email" label-for="email">
                    <b-form-input
                        v-model="selectedEmployee.email"
                        id="email"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Address" label-for="form-address">
                    <b-form-input
                        v-model="selectedEmployee.address"
                        id="form-address"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Admin" label-for="form-admin">
                    <b-form-checkbox
                        v-model="selectedEmployee.isAdmin"
                        id="form-admin"
                    ></b-form-checkbox>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer="{ Delete, cancel }">
                <b-button @click="updateEmployee()">Save Changes</b-button>
                <b-button @click="cancel()">Cancel</b-button>
            </template>
        </b-modal>
    </b-container>
</template>

<script>
import { db } from '../main';
import auth from '@/auth';
import { v4 as uuidv4 } from 'uuid';

export default {
    data() {
        return {
            companyName: 'Some Company',
            companyId: '',
            employeeFields: ['id', 'firstName', 'lastName', 'email', 'address'],
            employees: [],
            selectedEmployee: {},
            newEmployee: {
                firstName: '',
                lastName: '',
                email: '',
                address: '',
            },
        };
    },
    methods: {
        getEmployee() {
            const employeeId = auth.getUser();
            db.collection('employees')
                .doc(employeeId)
                .get()
                .then(snapshot => {
                    const returnData = snapshot.data();
                    this.companyId = returnData.companyId;
                    this.getCompanyEmployees();
                });
        },
        getCompanyEmployees() {
            const employeeId = auth.getUser();
            this.$bind(
                'employees',
                db
                    .collection('employees')
                    .where('companyId', '==', this.companyId),
            ).then(employees => {
                console.log(employees);
            });
        },
        getFirstDayOfWeek(date) {
            const dayOfWeek = date.getDay();
            const firstDayOfWeek = new Date(date);
            const diff = dayOfWeek >= 0 ? dayOfWeek - 0 : 6 - dayOfWeek;
            firstDayOfWeek.setDate(date.getDate() - diff);
            firstDayOfWeek.setHours(0, 0, 0, 0);

            return this.formatDate(firstDayOfWeek);
        },
        formatDate(date) {
            let month = '' + (date.getMonth() + 1);
            let day = '' + date.getDate();
            const year = date.getFullYear();
            if (month.length < 2) {
                month = '0' + month;
            }
            if (day.length < 2) {
                day = '0' + day;
            }
            return [month, day, year].join('/');
        },
        onRowSelected(employees) {
            this.selectedEmployee = employees[0];
        },
        getEmployeeInfo() {
            this.$refs['edit-modal'].show();
        },
        getAddModal() {
            this.newEmployee = {
                firstName: '',
                lastName: '',
                email: '',
                address: '',
            };
            this.$refs['add-modal'].show();
        },
        addEmployee() {
            this.newEmployee.employeeId = uuidv4();
            this.newEmployee.companyId = this.companyId;
            db.collection('employees').add(this.newEmployee);
            auth.createAuthUser(this.newEmployee.email, 'changeme');
            this.$refs['add-modal'].hide();
        },
        updateEmployee() {
            db.collection('employees')
              .doc(this.selectedEmployee.id)
              .set(this.selectedEmployee)
              .then(() => {
                console.log('user updated!')
              });
              this.$refs['edit-modal'].hide();
        },
        deleteEmployee() {
            db.collection('employees')
              .doc(this.selectedEmployee.id)
              .delete();
              this.$refs['delete-modal'].hide();
        },
    },
    created() {
        this.getEmployee();
    },
};
</script>
