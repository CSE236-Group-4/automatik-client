<template>
    <b-container class="p-0">
    	<b-button to="/" class="mt-3">Home</b-button>
      <h1 class="text-center pt-3">
        {{ companyName }} Employees
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
        <b-col>
          <b-table
              :fields="employeeFields"
              :items="employees"
              bordered
              selectable
              select-mode="single"
              class="schedule-table"
              head-variant="dark"
          ></b-table>
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
        	employeeFields: ['id', 'name', 'dept'],
        	employees: []
        };
    },
    methods: {
        getEmployees() {
            this.employees = [{
        		id: '1',
        		name: 'Dan Bateman',
        		dept: 'Human Resources',
        	},
        	{
        		id: '2',
        		name: 'Aaron Wakeen',
        		dept: 'Logistics',
        	}]
        },
    },
    created() {
    	this.getEmployees();
    }
};
</script>