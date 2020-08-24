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
			    passwordLog:'',
			    errorMessage:''
		    }
	},
	
    template: `
<div class = "bg-login">
<div class = "page">
    <div class = "form sign-in">
        <h1 class = "login-h1">Prijavi se</h1>
        <label class = "login-label">
            <span> Korisničko ime </span>
			<input class = "login-input" type="text" name = "username" v-on:change="signalChange" v-model="usernameLog">
        </label>
        <label class = "login-label">
            <span> Lozinka </span>
			<input class = "login-input" type="password" name="password" v-model="passwordLog" v-on:change="signalChange">
			<p style="color:red">{{errorMessage}}</p>
        </label>
        <button class="submit" v-on:click="tryToLogin" type="button"> Prijavi se </button>
    </div>


<div class="sub-page">
    <div class = "bground">
        <div
         class = "bground-text m-up">
            <h1 class = "login-h1">Nemate nalog?</h1>
            <p class = "login-p">Registrujte se i rezervišite sebi apartman!</p>
        </div>
    
        <div class="bground-text m-in">
            <h1 class = "login-h1" >Već imate nalog?</h1>
            <p class = "login-p">Ako već imate nalog, prijavite se i rezervišite sebi apartman!</p>
        </div>
        <div class="bground-btn"  v-on:click="slideToOther">
            <span class="m-up">Registrujte se</span>
            <span class="m-in">Prijavite se</span>
        </div>
</div>

<div class="form sign-up">
    <h1 class = "login-h1" >Registrujte se</h1>
    <label class = "login-label">
        <span>Ime</span>
        <input class = "login-input" type="text" v-model="nameRegister"  name="name">
    </label>
    <label class = "login-label">
        <span>Prezime</span>
        <input class = "login-input" type="text" name="surname" v-model="surnameRegister">
    </label>
    <label class = "login-label" >
        <span>Korisničko ime</span>
        <input class = "login-input" type="text" name="username" v-model="usernameRegister">
    </label>
    <label class = "login-label">
        <span>Lozinka</span>
        <input class = "login-input" type="password" name="password" v-model="passwordRegister">
    </label>
    <label class = "login-label">
        <span>Ponovite lozinku</span>
        <input class = "login-input" type="password" name="passwordRepeat" v-model="passwordRepeat">
    </label>
    <button type="button" class="submit" v-on:click="registerUser">Registrujte se</button>
</div>

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

			if(this.usernameLog=='' || this.passwordLog=='')
			{
				this.errorMessage="Morate popuniti sva polja.";
			}
			else
			{

				let loginParameters = {
    				username : this.usernameLog,
    				password : this.passwordLog
    		};
    		
    		axios 
    			.post('/user/login', JSON.stringify(loginParameters))
    			.then(response => {
    				if (response.data == "") {
						this.errorMessage="Neispravno korisničko ime ili lozinka.";
    				} else {
    					window.location.href = "http://localhost:8088/#/profile-view";
    				}
				})
			}
			
    		
    		
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
    					window.location.href = "http://localhost:8088/#/profile-view";
    				}
    			})
		},
		
		signalChange : function()
		{
			this.errorMessage="";
		}
    }
});