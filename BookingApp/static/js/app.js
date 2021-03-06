const login = { template : '<login></login>' }
const profile_view = { template : '<profile-view></profile-view>' }
const change_pass = { template : '<change_pass></change_pass>' }
const edit_profile = { template : '<edit_profile ></edit_profile>' }
const apartments = { template : "<apartments></apartments>" }
const apartmentDetails = {template : "<apartment-details></apartment-details>"}
const users_preview = {template : "<users_preview></users_preview>"}
const searchApartment = { template : "<search-apartment></search-apartment>" }
const my_apartments= { template : "<my_apartments></my_apartments>" }
const add_apartment= { template : "<add_apartment></add_apartment>" }
const reservations = { template : "<reservations></reservations>" }
const amenities = { template : "<amenities></amenities>"}
const edit_apartment = { template : "<edit_apartment></edit_apartment>"}
const homepage = { template : "<homepage></homepage>" }
const add_nonWorkingDays={template:"<add_nonWorkingDays></add_nonWorkingDays>"}
const forbidden = { template: "<forbidden></forbidden>" }
const registerHost = { template: "<registerHost></registerHost>" }

const router = new VueRouter({
    mode : 'hash',
    base : '/apartments',
    routes : [
		{ path : "/apartments", component: apartments },
		{ path : '/login', component: login },
		{ path : '/profile-view', component: profile_view },
		{ path : '/change_pass', component: change_pass },
		{ path : '/edit_profile', component: edit_profile },
		{ path : "/details", component: apartmentDetails },
		{ path : "/users_preview", component: users_preview },
		{ path : "/search", component: searchApartment },
		{ path : "/my_apartments", component: my_apartments },
		{ path : "/add_apartment", component: add_apartment },
		{ path : "/reservations", component: reservations },
		{ path : "/amenities", component: amenities },
		{ path : "/edit_apartment", component: edit_apartment },
		{ path : "/add_nonWorkingDays", component: add_nonWorkingDays },
		{ path : "/forbidden", component: forbidden },
		{ path : "/registerHost", component: registerHost } 
    ]
});

var app = new Vue({
    router: router, 
    el: '#webApp',
    data: {
    	mode : 'plsWork',
    	user : {
    		username : "xxxxxxxxxxxxx"
    	}
    },
    mounted() {
    	axios
	    	.get('/user/seeIfLogged')
	    	.then(response => {
	    		if (response.data == null) {
	    			this.mode = 'notLogged';
	    		} else 
	    		{
	    			if (response.data.role == "Guest") {
	    				this.mode = 'guest';
	    			} else if (response.data.role == "Host") {
		    			this.mode = 'host';
		    		} else if (response.data.role == "Administrator") {
		    			this.mode = 'admin';
		    		} else {
		    			this.mode = 'notLogged';
		    		}
	    			this.user = response.data;
	    		}
	    	})
	    	
	    	window.location.href = "#/apartments";
    },
    methods : {
    	logOut : function() {
    		axios 
    			.get('/user/logout')
    			.then(response => {
    				this.mode = 'notLogged';
    				console.log(this.mode);
    				window.location.href = "#/login";
    			})
    		
    	},
    	viewProfile : function() {

            window.location.href = "http://localhost:8088/#/profile-view?id=" + this.user.username;
    	},
    	getReservations : function() {
    		window.location.href = "http://localhost:8088/#/reservations?id=" + this.user.username;
    
    	},
    	canSeePreview : function() {
    		console.log(this.mode);
    		if (this.mode == 'host') {
    			return false;
    		} else if (this.mode == 'admin') {
    			return false;
    		} else {
    			return true;
    		}
    	}
    }
});
