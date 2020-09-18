Vue.component("registerHost", {

	data: function () {
		    return {
		    	error:'',
		    	usernameRegister: '',
		    	passwordRegister: '',
		    	nameRegister: '',
				surnameRegister: '',
				genderRegister:'',
		    	passwordRepeat: '',
				errorMessage:'',
				registrationError: '',
				roleRegister : ""
		    }
	},
	
    template: `
<div class = "bg-login">
<div class = "page-login">
<div class="sub-page">
    <div class = "bground">
        <div class = "bground-text m-up">
            <p class = "login-p">Registrujte se <br> novog domaćina!</p>
        </div>
    
        <div hidden class="bground-text m-in">
            <h1 class = "login-h1" >Već imate nalog?</h1>
            <p class = "login-p">Ako već imate nalog, prijavite se i rezervišite sebi apartman!</p>
        </div>
        <div hidden class="bground-btn"  v-on:click="slideToOther">
            <span class="m-up">Registrujte se</span>
            <span class="m-in">Prijavite se</span>
        </div>
</div>

<div class="form sign-up">
    <h1>Registracija</h1>
    <label class = "login-label">
        <span >Ime</span>
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
        <input type="password" class = "login-input"  name="passwordRepeat" v-model="passwordRepeat">
	</label>
	<label class = "login-label">
	<span>Pol</span>
	
	<tr class="radio_button">
	<td>
	<input type="radio" id="male" name="gender" value="Musko" v-model="genderRegister" style="width:70px;">
	<span for="male" style="width:70px;">Muško</span>
	</td>
	<td>
	<input type="radio" id="female" name="gender" value="Zensko" v-model="genderRegister"  style="width:70px;">
	<span for="female"  style="width:70px;">Žensko</span>
	</td>
	<td>
	<input type="radio" id="other" name="gender" value="Ostalo" v-model="genderRegister"  style="width:70px;">
	<span for="other"  style="width:70px;">Ostalo</span>
	</td>
	</tr>
	</label>
	
	<p style="color:red; text-align:center;">{{registrationError}}</p>
    <button type="button" class="submit-reg" v-on:click="registerUser">Registrujte</button>
</div>

</div>
</div>
</div>
    `, 
    
	mounted () {
		document.querySelector('.page-login').classList.toggle('s-signup');

    	axios
    		.get("amenities/canISee")
    		.then(response => {
    			if (response.status == 403) {
    				window.location.href = "#/forbidden";
    			}
    		})
    		.catch(function(error) {
    			if (error.response.status == 403) {
    				window.location.href = "#/forbidden";
    			}
    		});
    }, 
    methods : {
    	slideToOther : function() {
    		document.querySelector('.page-login').classList.toggle('s-signup');
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
					} 
					else if (response.data == "Korisnik je blokiran") {
						this.errorMessage="Blokirani ste i ne možete da se prijavite.";
					} 
					
					else {
    					window.location.href = "http://localhost:8088/";
    				}
				})
			}
			
    		
    		
    	}, 
    	registerUser : function() {
			console.log("wut");
			let flag=true;
			
			if(this.nameRegister=="" ||this.surnameRegister=="" ||this.usernameRegister=="" ||this.passwordRegister=="" || this.genderRegister=="")
			{
				this.registrationError="Morate popuniti sva polja u formi.";
				flag=false;
			}
			else if(this.passwordRegister!=this.passwordRepeat)
			{
				this.registrationError="Lozinke se ne slažu.";
				flag=false;
			}
			if(flag)
			{
				console.log("wuuut");
				let genderReg;
				if (this.genderRegister == 'Musko') {
					genderReg = 'Male';
				} else if(this.genderRegister == 'Zensko'){
					genderReg = 'Female';
				} else {
					genderReg = 'Other';
				}
				this.roleRegister = "Host";
				let registrationParameters = {
    				name : this.nameRegister,
    				surname : this.surnameRegister,
    				username : this.usernameRegister,
    				password : this.passwordRegister,
    				role : this.roleRegister,
    				gender : genderReg
    		};

    		axios 
    			.post('/user/registerHost', JSON.stringify(registrationParameters))
    			.then(response => {
    				if (response.data == null) {
    					console.log("wut");
    					toast("Došlo je do neke greške");
    					window.location.href = "#/registerHost";
    				} else {
    					console.log("wut");
    					this.$router.go(-1);
    				}
    			})
			}
    		
		},
		
		signalChange : function()
		{
			this.errorMessage="";
		}
    }
})