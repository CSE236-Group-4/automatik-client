<template>
    <b-container class="p-0">
        <h1 class="text-center pt-3">
            Welcome {{ user.firstName }} {{ user.lastName }}
        </h1>
        <b-row class="py-3">
            <b-col class="col-8">
                <b-table
                    :fields="scheduleFields"
                    :items="scheduleTable"
                    bordered
                    class="schedule-table"
                    head-variant="dark"
                ></b-table>
            </b-col>
            <b-col class="col-4">
                <v-calendar></v-calendar>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="col-8">
                <b-table
                    :fields="userFields"
                    :items="userTable"
                    bordered
                    head-variant="dark"
                ></b-table>
            </b-col>
        </b-row>
        <b-row v-if="user.isAdmin">
            <b-col>
                <b-button block to="/employees">Employees</b-button>
            </b-col>
            <b-col>
                <b-button block to="/schedules">Schedules</b-button>
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
            employeeId: auth.getUser(),
            companyId: '',
            userTable: [],
            userFields: ['firstName', 'lastName', 'email', 'address'],
            schedule: {},
            scheduleTable: [],
            scheduleFields: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
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
                    this.user = returnData;
                    this.userTable.push(returnData);
                    this.companyId = returnData.companyId;
                    this.getSchedule();
                });
        },
        getSchedule() {
            const employeeId = auth.getUser();
            this.$bind(
                'schedule',
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
                    if (employeeSchedule.employeeId === employeeId) {
                        this.scheduleTable.push(employeeSchedule);
                    }
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
    },
    created() {
        this.getEmployee();
    },
};
</script>

<style lang="scss">
.schedule-table {
    min-height: 15em;
}
</style>
