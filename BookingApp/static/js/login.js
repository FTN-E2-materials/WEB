Vue.component("login", {

	data: function () {
		    return {
		    	logged : null,
		    	error:'',
		    	usernameLog: '',
		    	usernameRegister: '',
		    	passwordRegister: '',
		    	nameRegister: '',
		    	surnameRegister: '',
		    	passwordRepeat: '',
		    	usernameError:'',
			    passwordLog:'',
			    passwordError:''
		    }
	},
	
    template: `

<div class = "page">
    <div class = "form sign-in">
        <h1>Prijavi se</h1>
        <label>
            <span> Korisničko ime </span>
            <input type="text" name = "username" v-model="usernameLog">
        </label>
        <label>
            <span> Lozinka </span>
            <input type="password" name="password" v-model="passwordLog">
        </label>
        <button class="submit" v-on:click="tryToLogin" type="button"> Prijavi se </button>
    </div>


<div class="sub-page">
    <div class = "bground">
        <div class = "bground-text m-up">
            <h1>Nemate nalog?</h1>
            <p>Registrujte se i rezervišite sebi apartman!</p>
        </div>
    
        <div class="bground-text m-in">
            <h1>Već imate nalog?</h1>
            <p>Ako već imate nalog, prijavite se i rezervišite sebi apartman!</p>
        </div>
        <div class="bground-btn"  v-on:click="slideToOther">
            <span class="m-up">Registrujte se</span>
            <span class="m-in">Prijavite se</span>
        </div>
</div>

<div class="form sign-up">
    <h1>Registrujte se</h1>
    <label>
        <span>Ime</span>
        <input type="text" v-model="nameRegister" name="name">
    </label>
    <label>
        <span>Prezime</span>
        <input type="text" name="surname" v-model="surnameRegister">
    </label>
    <label>
        <span>Korisničko ime</span>
        <input type="text" name="username" v-model="usernameRegister">
    </label>
    <label>
        <span>Lozinka</span>
        <input type="password" name="password" v-model="passwordRegister">
    </label>
    <label>
        <span>Ponovite lozinku</span>
        <input type="password" name="passwordRepeat" v-model="passwordRepeat">
    </label>
    <button type="button" class="submit" v-on:click="registerUser">Registrujte se</button>
</div>

</div>
</div>
    `, 
    
	mounted () {
       axios
        .get('/test')
        .then(response => {
        	if(response.data == null)
        		this.logged = false;
        	else
        		this.logged = true;
        })

    }, 
    methods : {
    	slideToOther : function() {
    		document.querySelector('.page').classList.toggle('s-signup');
    	},
    	
    	tryToLogin : function() {
    		let loginParameters = {
    				username : this.usernameLog,
    				password : this.passwordLog
    		};
    		
    		axios 
    			.post('/user/login', JSON.stringify(loginParameters))
    			.then(response => {
    				if (response.data == null) {
    					window.location.href = "#/login";
    				} else {
    					window.location.href = "http://localhost:8088/";
    				}
    			})
    		
    	}, 
    	registerUser : function() {
    		let registrationParameters = {
    				name : this.nameRegistration,
    				surname : this.surnameRegistration,
    				username : this.usernameRegistration,
    				password : this.passwordRegistration,
    				role : 'Guest',
    				gender : 'Female'
    		};

    		axios 
    			.post('/user/register', JSON.stringify(registrationParameters))
    			.then(response => {
    				if (response.data == null) {
    					window.location.href = "#/login";
    				} else {
    					window.location.href = "http://localhost:8088/";
    				}
    			})
    	}
    }
});