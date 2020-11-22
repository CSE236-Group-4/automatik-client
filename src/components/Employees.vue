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
      		<b-button @click="getEmployeeInfo">Edit</b-button>
      	</b-col>
      	<b-col class="col-1">
      		<b-button v-b-modal.delete-modal :disabled="selectedEmployee == {}">Delete</b-button>
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
            id="delete-modal"
            centered
            model-ok="Delete"
            title="Confirm deletion"
        >
            <span class="my-4 bold"
                >Are you sure you want to delete {{ selectedEmployee.name }}?</span
            >
            <template v-slot:modal-footer="{ Delete, cancel }">
                <b-button variant="danger">Delete</b-button>
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
                <b-form-group label="Employee ID" label-for="form-id">
                    <b-form-input
                        v-model="employeeInfo.employeeId"
                        id="form-id"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="First Name" label-for="form-fname">
                    <b-form-input
                        v-model="employeeInfo.firstName"
                        id="form-fname"
                    ></b-form-input>
                </b-form-group>  
                <b-form-group label="Last Name" label-for="form-lname">
                    <b-form-input
                        v-model="employeeInfo.lastName"
                        id="form-lname"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Address" label-for="form-address">
                    <b-form-input
                        v-model="employeeInfo.address"
                        id="form-address"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Admin" label-for="form-admin">
                    <b-form-checkbox
                        v-model="employeeInfo.isAdmin"
                        id="form-admin"
                    ></b-form-checkbox>
                </b-form-group>                                                
            </b-form>
            <template v-slot:modal-footer="{ Delete, cancel }">
                <b-button>Save Changes</b-button>
                <b-button @click="cancel()">Cancel</b-button>
            </template>
        </b-modal>
    </b-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
        	companyName: 'Some Company',
        	employeeFields: ['id', 'name', 'dept'],
        	employees: [],
        	selectedEmployee: {},
        	employeeInfo: {
        		employeeId: '',
            	firstName: '',
            	lastName: '',
            	address: '',
            	isAdmin: false,
        	},
        };
    },
    methods: {
        getEmployees() {
            this.employees = [{
        		id: '12345',
        		name: 'Dan Bateman',
        		dept: 'Human Resources',
        	},
        	{
        		id: '67891',
        		name: 'Aaron Wakeen',
        		dept: 'Logistics',
        	}]
        },
        onRowSelected(employees) {
        	this.selectedEmployee = employees[0]
      	},
      	getEmployeeInfo() {
            this.$refs['edit-modal'].show();
            this.employeeInfo = {
              employeeId: '12345',
              firstName: 'Dan',
              lastName: 'Bateman',
              address: '123 Lane Drive',
              isAdmin: true,
            };
            
        },
    },
    created() {
    	this.getEmployees();
    }
};
</script>