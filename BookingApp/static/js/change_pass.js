Vue.component("change_pass",{
    data: function(){
        return {
            oldPass:'',
            newPass:'',
            newPassRepeat:'',
            errorMessage:'',
            usersPass:''
        }
    } ,

    template: `<div class="form-part">
    <div class = "form sign-in">
    <h1 class = "login-h1">Promena lozinke</h1>
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
    <button class="submit"  type="button" v-on:click="changePassword"> Promeni lozinku </button>
</div>
    </div>`,
    mounted() {
        axios
        .get('/user/seeIfLogged')
        .then(response=> {
            if(response.data!=null)
            {
                this.usersPass=response.data.password;
            }
        })

    } ,

    methods: {
        signalChange : function()
		{
			this.errorMessage="";
		},
        
        changePassword : function() {
        let flag1=true;
        let flag2=true;
        let flag3=true;
        if(this.oldPass=="" || this.newPass=="" || this.newPassRepeat=="")
        {
            this.errorMessage="Morate popuniti sva polja.";
            flag1=false;
        }
        else if(this.usersPass!=this.oldPass){
            this.errorMessage="Neispravna lozinka.";
            flag2=false;
        }
        else if(this.newPass!=this.newPassRepeat)
        {
            this.errorMessage="Lozinke se ne slažu.";
            flag3=false;
        }
        else if(flag1 && flag2 && flag3)
        {
            window.location.href = "http://localhost:8088/#/profile-view";
    /*    axios 
            .post('/user/changePassword', JSON.stringify(this.newPass))
            .then(response => {
                if (response.data == null) {
                    window.location.href = "#/profile_view";
                } else {
                    window.location.href = "http://localhost:8088/#/profile-view";
                }
            })
        }*/
        
        }
    }

}});