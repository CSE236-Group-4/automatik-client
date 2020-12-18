<template>
    <b-container class="p-0">
        <b-button to="/" class="mt-3">Home</b-button>
        <h1 class="text-center pt-3">{{ companyName }} Schedules</h1>
        <b-button @click="logout()" to="/login" class="float-right">Logout</b-button>
        <b-row>
            <b-col class="col-1">
                <b-button @click="getAddModal">Add shift</b-button>
            </b-col>
            <b-col class="col-1">
                <b-button v-b-modal.edit-modal>Edit shift</b-button>
            </b-col>
            <b-col class="col-1">
                <b-button
                    v-b-modal.delete-modal
                    >Delete shift</b-button
                >
            </b-col>
        </b-row>
        <b-row class="py-3">
            <b-col class="col-8">
                <b-table
                    :fields="shiftFields"
                    :items="shiftData"
                    bordered
                    selectable
                    select-mode="single"
                    head-variant="dark"
                    @row-selected="onRowSelected"
                ></b-table>
            </b-col>
            <b-col class="col-4">
                <v-calendar></v-calendar>
            </b-col>
        </b-row>
        <b-modal
            id="add-modal"
            ref="add-modal"
            centered
            :title="`Add shift`"
        >
            <b-container fluid>
                <b-form>
                   <b-form-group label="Employee ID" label-for="employeeId">
                        <b-form-input
                            v-model="newShift.employeeId"
                            id="employeeId"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Sun" label-for="sun">
                        <b-form-input
                            v-model="newShift.sun"
                            id="sun"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Mon" label-for="mon">
                        <b-form-input
                            v-model="newShift.mon"
                            id="mon"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Tue" label-for="tue">
                        <b-form-input
                            v-model="newShift.tue"
                            id="tue"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Wed" label-for="wed">
                        <b-form-input
                            v-model="newShift.wed"
                            id="wed"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Thu" label-for="thu">
                        <b-form-input
                            v-model="newShift.thu"
                            id="thu"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Fri" label-for="fri">
                        <b-form-input
                            v-model="newShift.fri"
                            id="fri"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Sat" label-for="sat">
                        <b-form-input
                            v-model="newShift.sat"
                            id="sat"
                        ></b-form-input>
                    </b-form-group>
                </b-form>
            </b-container>
            <template v-slot:modal-footer>
                <b-button variant="success" @click.prevent="addShift()"
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
                >Are you sure you want to delete the schedule for
                {{ selectedShift.employeeId }}?</span
            >
            <template v-slot:modal-footer="{ Delete, cancel }">
                <b-button variant="danger" @click="deleteShift()">Delete</b-button>
                <b-button @click="cancel()">Cancel</b-button>
            </template>
        </b-modal>
        <b-modal
            id="edit-modal"
            ref="edit-modal"
            centered
            model-ok="Edit"
            title="Edit Shift"
        >
            <b-form>
                <b-form>
                   <b-form-group label="Employee ID" label-for="employeeId">
                        <b-form-input
                            v-model="selectedShift.employeeId"
                            id="employeeId"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Sun" label-for="sun">
                        <b-form-input
                            v-model="selectedShift.sun"
                            id="sun"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Mon" label-for="mon">
                        <b-form-input
                            v-model="selectedShift.mon"
                            id="mon"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Tue" label-for="tue">
                        <b-form-input
                            v-model="selectedShift.tue"
                            id="tue"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Wed" label-for="wed">
                        <b-form-input
                            v-model="selectedShift.wed"
                            id="wed"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Thu" label-for="thu">
                        <b-form-input
                            v-model="selectedShift.thu"
                            id="thu"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Fri" label-for="fri">
                        <b-form-input
                            v-model="selectedShift.fri"
                            id="fri"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Sat" label-for="sat">
                        <b-form-input
                            v-model="selectedShift.sat"
                            id="sat"
                        ></b-form-input>
                    </b-form-group>
                </b-form>
            </b-form>
            <template v-slot:modal-footer="{ Delete, cancel }">
                <b-button @click="updateShift()">Save Changes</b-button>
                <b-button @click="cancel()">Cancel</b-button>
            </template>
        </b-modal>
    </b-container>
</template>

<script>
import { db } from '../main';
import auth from '@/auth';

export default {
    data() {
        return {
            user: {},
            employeeId: '',
            companyId: '',
            schedule: {},
            shiftData: [],
            scheduleTable: [],
            shiftFields: [
                'employeeId',
                'sun',
                'mon',
                'tue',
                'wed',
                'thu',
                'fri',
                'sat',
            ],
            newShift: {},
            selectedShift: {},
            companyName: 'Some Company',
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
                    this.getSchedule();
                });
        },
        getSchedule() {
            this.$bind(
                'scheduleTable',
                db
                    .collection('schedules')
                    .where('companyId', '==', this.companyId)
                    .where(
                        'startingDate',
                        '==',
                        this.getFirstDayOfWeek(new Date()),
                    )
                    .limit(1),
            ).then(schedules => {
                this.schedule = schedules[0];
                console.log(this.schedule);
                schedules[0].data.forEach(shift => {
                    this.shiftData.push(shift);
                });
            });
        },
        onRowSelected(shifts) {
            this.selectedShift = shifts[0];
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
        logout() {
            auth.logout();
        },
        addShift() {
            this.schedule.data.push(this.newShift);
            this.shiftData.push(this.newShift);
            db.collection('schedules')
              .doc(this.schedule.id)
              .set(this.schedule)
              .then(() => {
                console.log('schedule updated!')
              });
            this.$refs['add-modal'].hide();
        },
        deleteShift() {
            this.schedule.data = this.schedule.data.filter(shift => { 
                return shift.employeeId != this.selectedShift.employeeId
            });
            this.shiftData = this.shiftData.filter(shift => {
                return shift.employeeId != this.selectedShift.employeeId
            });
            db.collection('schedules')
              .doc(this.schedule.id)
              .set(this.schedule)
              .then(() => {
                console.log('schedule updated!')
              });
              this.$refs['delete-modal'].hide();
        },
        updateShift() {
            this.schedule.data = this.schedule.data.filter(shift => { 
                return shift.employeeId != this.selectedShift.employeeId
            });
            this.schedule.data.push(this.selectedShift);
            this.shiftData = this.shiftData.filter(shift => {
                return shift.employeeId != this.selectedShift.employeeId
            });
            this.shiftData.push(this.selectedShift);
            db.collection('schedules')
              .doc(this.schedule.id)
              .set(this.schedule)
              .then(() => {
                console.log('schedule updated!')
              });
              this.$refs['edit-modal'].hide();
        },
        getAddModal() {
            this.newShift = {};
            this.$refs['add-modal'].show();
        },
    },
    created() {
        this.getEmployee();
    },
};
</script>
