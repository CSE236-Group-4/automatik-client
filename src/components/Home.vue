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
export default {
    data() {
        return {
          user: {},
          userTable: [],
          userFields: ['employeeId', 'firstName', 'lastName', 'address'],
          schedule: {},
          scheduleTable: [],
          scheduleFields: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        };
    },
    methods: {
        getEmployee() {
            this.user = {
              employeeId: '12345',
              firstName: 'Dan',
              lastName: 'Bateman',
              address: '123 Lane Drive',
              isAdmin: true,
            };
            this.userTable.push(this.user);
        },
        getSchedule() {
          this.schedule = {
            sun: null,
            mon: '8:00am - 7:00pm',
            tue: null,
            wed: '8:00am - 7:00pm',
            thu: null,
            fri: '8:00am - 7:00pm',
            sat: null,
          };
          this.scheduleTable.push(this.schedule);
        },
    },
    created() {
      this.getEmployee();
      this.getSchedule();
    },
};
</script>

<style lang="scss">
.schedule-table {
    min-height: 15em;
}
</style>
