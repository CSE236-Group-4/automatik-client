<template>
    <b-container class="p-0">
        <b-button to="/" class="mt-3">Home</b-button>
        <h1 class="text-center pt-3">{{ companyName }} Schedules</h1>
        <b-button @click="logout()" to="/login" class="float-right">Logout</b-button>
        <b-row>
            <b-col class="col-1">
                <b-button>Create</b-button>
            </b-col>
            <b-col class="col-1">
                <b-button>Edit</b-button>
            </b-col>
            <b-col class="col-1">
                <b-button>Delete</b-button>
            </b-col>
        </b-row>
        <b-row class="py-3">
            <b-col class="col-8">
                <b-table
                    :fields="scheduleFields"
                    :items="scheduleData"
                    bordered
                    selectable
                    select-mode="single"
                    class="schedule-table"
                    head-variant="dark"
                ></b-table>
            </b-col>
            <b-col class="col-4">
                <v-calendar></v-calendar>
            </b-col>
        </b-row>
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
            scheduleData: [],
            scheduleTable: [],
            scheduleFields: [
                'employeeId',
                'sun',
                'mon',
                'tue',
                'wed',
                'thu',
                'fri',
                'sat',
            ],
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
                    this.getSchedules();
                });
        },
        getSchedules() {
            const employeeId = auth.getUser();
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
                schedules[0].data.forEach(employeeSchedule => {
                    this.scheduleData.push(employeeSchedule);
                });
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
        logout() {
            auth.logout();
        },
    },
    created() {
        this.getEmployee();
    },
};
</script>
