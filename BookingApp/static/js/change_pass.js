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
    <h2>Promena lozinke</h2>
    <div class = "form sign-in">
    
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
    <td style="padding-left:125px">
    <button class="side-menu-button"  type="button" v-on:click="changePassword"> Promeni lozinku </button>
    </td>
    <td style="padding-left:15px">
    <button class="side-menu-button"  type="button" v-on:click="changePassword" v-on:click="CancelChangePass"> Odustani</button>
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
    },
    CancelChangePass: function (){
        this.$router.push("/profile-view");
    }

}});