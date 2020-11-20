<template>
    <b-container class="p-0">
        <h1 class="text-center pt-3">Welcome {{ user.firstName }} {{ user.lastName }}</h1>
        <b-row class="py-3">
        	<b-col class="col-8">
        		<b-table :items="scheduleTable" :fields="scheduleFields" bordered head-variant="dark" class="schedule-table"></b-table>
        	</b-col>
        	<b-col class="col-4">
        		<b-calendar></b-calendar>
        	</b-col>
        </b-row>
        <b-row>
        	<b-col class="col-8">
        		<b-table :items="userTable" :fields="userFields" bordered head-variant="dark"></b-table>
        	</b-col>
        </b-row>
        <b-row v-if="user.isAdmin">
        	<b-col>
        		<b-button to="/employees" block>Employees</b-button>
        	</b-col>
        	<b-col>
        		<b-button to="/schedules" block>Schedules</b-button>
        	</b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';
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
    created() {
    	// Temporary mock data for testing purposes
    	this.user = {
    		employeeId: '12345',
    		firstName: 'Dan',
    		lastName: 'Bateman',
    		address: '123 Lane Drive',
    		isAdmin: true,
    	};
    	this.userTable.push(this.user);
    	this.schedule = {
    		sun: null,
    		mon: '8:00am - 7:00pm',
    		tue: null,
    		wed: '8:00am - 7:00pm',
    		thu: null,
    		fri: '8:00am - 7:00pm',
    		sat: null,
    	}
    	this.scheduleTable.push(this.schedule);
    	/* Get user info - Backend required
        axios
            .get('/user', {
                params: {
                },
            })
            .then(res => {
                this.user = res.data;
            })
            .catch(error => {
                console.log(error);
            });
        Get schedule info
        axios
            .get('/schedule', {
                params: {
                    limit: 20,
                    skip: 0,
                },
            })
            .then(res => {
                this.schedule = res.data
            })
            .catch(error => {
                console.log(error);
            });
        */
    },
};
</script>

<style lang="scss">
.schedule-table {
    min-height: 15em;
}
</style>