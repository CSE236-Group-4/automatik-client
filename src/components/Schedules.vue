<template>
    <b-container class="p-0">
    	<b-button to="/" class="mt-3">Home</b-button>
      <h1 class="text-center pt-3">
        {{ companyName }} Schedules
      </h1>
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
              :items="shifts"
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
import axios from 'axios';
export default {
    data() {
        return {
        	companyName: 'Some Company',
        	scheduleFields: ['shift', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        	shifts: [],
        };
    },
    methods: {
        getSchedules() {
            this.shifts = [{
        		shift: '1',
        		mon: 'Dan Bateman',
        		tue: 'Aaron Wakeen',
        		wed: 'Dan Bateman',
        		thu: 'Aaron Wakeen'
        	},
        	{
        		shift: '2',
        		mon: 'Dan Bateman',
        		tue: 'Aaron Wakeen',
        		wed: 'Dan Bateman',
        		thu: 'Aaron Wakeen'
        	}]
        },
    },
    created() {
    	this.getSchedules();
    }
};
</script>