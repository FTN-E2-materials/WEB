const login = { template : '<login></login>' }
const profile_view = { template : '<profile-view></profile-view>' }


const router = new VueRouter({
    mode : 'hash',
    routes : [
		{ path : '/login', component: login },
		{ path : '/profile-view', component: profile_view }
    ]
});

var app = new Vue({
    router: router, 
    el: '#webApp',
    data: {
    	mode : 'plsWork'
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
	    		}
	    		
	    		console.log(this.mode);
	    	})
    },
    methods : {
    	logOut : function() {
    		axios 
    			.get('/user/logout')
    			.then(response => {
    				window.location.hred = "#/login";
    				this.mode = 'notLogged';
    			})
    	}
    }
});