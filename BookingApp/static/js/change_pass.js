Vue.component("change_pass",{
    data: function(){
        return {
            oldPass:'',
            newPass:'',
            newPassRepeat:'',
            errorMessage:'',
            usersPass:'',
            user : null
        }
    } ,

    template: `<div class="form-part">
    <h2>Promena lozinke</h2>
    <div class = "form-change-pass">
    
    <label class = "login-label">
        <span> Stara lozinka:</span>
        <input class = "login-input" type="password" name = "username" v-on:change="signalChange" v-model="oldPass">
    </label>
    <label class = "login-label">
        <span> Nova lozinka: </span>
        <input class = "login-input" type="password" name="password" v-model="newPass" v-on:change="signalChange">
    </label>
    <label class = "login-label">
        <span> Ponovi lozinku: </span>
        <input class = "login-input" type="password" name="password" v-model="newPassRepeat" v-on:change="signalChange">
    </label>
    <p style="color:red" class = "login-label">{{errorMessage}}</p>
    <tr>
    <td style="padding-left:337px">
    <button class="side-menu-button"  type="button" v-on:click="changePassword"> Promeni lozinku </button>
    </td>
    <td style="padding-left:15px">
    <button class="side-menu-button"  type="button" v-on:click="CancelChangePass"> Odustani</button>
    </td>
    </tr>
    </div>
    </div>`,
    mounted() {
        axios
        .get('/user/seeIfLogged')
        .then(response=> {
            if(response.data!=null)
            {
                this.usersPass = response.data.password;
                this.user = response.data;
            }
        })

    } ,

    methods: {
        signalChange : function()
		{
			this.errorMessage="";
		},
        
        changePassword : function() {
        let flag=true;
        
        if(this.oldPass=="" || this.newPass=="" || this.newPassRepeat=="")
        {
            this.errorMessage="Morate popuniti sva polja.";
            flag=false;
        }
        else if(this.usersPass!=this.oldPass){
            this.errorMessage="Neispravna lozinka.";
            flag=false;
        }
        else if(this.newPass!=this.newPassRepeat)
        {
            this.errorMessage="Lozinke se ne slažu.";
            flag=false;
        }
        else if(this.newPass==this.oldPass)
        {
            this.errorMessage="Nova lozinka mora da se razlikuje od stare.";
            flag=false;
        }
        else if(flag)
        {   
	        axios 
	            .post('/user/changePassword', JSON.stringify(this.newPass))
	            .then(response => {
	                if (response.data != null) {
	                	toast("Uspešno ste promenili vašu lozinku!")
	                    window.location.href = "#/profile_view";
	                } else {
	                	toast("Došlo je do greške prilikom promene lozinke.");
	                    window.location.href = "http://localhost:8088/#/profile-view";
	                }
	            })
        }
        
    }   
    ,
    CancelChangePass: function (){
        window.location.href = "http://localhost:8088/#/profile-view?id="+this.user.username;
    }
}});