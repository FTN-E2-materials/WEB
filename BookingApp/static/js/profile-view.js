Vue.component("profile-view", {
    data: function(){
        return {
            id:'',
            name:'',
            surname: '',
            username: '',
            gender: '',
            editMode:false,
            profileImage: '',
            isThisMe : false,
            errorMessage:'',
            role:''
        }
    },

    template: `
    <div class="profile-view-part">
    <h2 v-bind:hidden="editMode==true">Informacije o profilu</h2>
    <h2 v-bind:hidden="editMode!=true">Izmena profila</h2>
  <div class="row-reservations">
                 <div class = "col-profile-pic">
                        <div>
                            <img :src="profileImage" class= "profile-image" alt = "Profile Image">
                            <div v-bind:hidden="editMode!=true">
                            <label  style="text-decoration:underline;margin-left:20px;text-transform:none;color: #5E548E;">Promeni profilnu sliku</label>
                            </div>
                        </div>
                    </div>
                    
        <div class="col-informations">

        

            <div class = "username">
                <label class="username2">Ime:</label>
                <div class = "col-filters">
                    <div class = "col-username2">
                    <p v-bind:hidden="editMode==true">{{name}}</p>
                    <input v-bind:hidden="editMode!=true" type="text" name = "name" v-model="name">
                    </div>
                </div>
               
            </div>
            <div class = "username">
                <label class="username2">Prezime:</label>
                <div class = "col-filters">
                    <div class = "col-username2">
                    <p v-bind:hidden="editMode==true">{{surname}}</p>
                    <input v-bind:hidden="editMode!=true" type="text" name = "surname" v-model="surname">
                    </div>
                </div>
            </div>

            <div class = "username">
                <label class="username2">Korisničko ime:</label>
                <div class = "col-filters">
                    <div class = "col-username2">
                        <p v-bind:hidden="editMode==true">{{username}}</p>
                        <input disabled v-bind:hidden="editMode!=true" type="text" name = "username" v-model="username">
                    </div>
                </div>
            </div>

            <div class = "username">
                <label class="username2">Pol:</label>
                <div class = "col-filters">
                    <div class = "col-username2">
                        <p v-bind:hidden="editMode==true">{{gender}}</p>
                    </div>
                    <tr v-bind:hidden="editMode!=true" class="radio_button">
                    <td>
                    <input type="radio" id="male" name="gender" value="Muško" v-bind:checked="gender=='Muško'" style="width:70px;">
                    <span for="male" style="width:70px;">Muško</span>
                    </td>
                    <td>
                    <input type="radio" id="female" name="gender" value="Žensko" v-bind:checked="gender=='Žensko'"   style="width:70px;">
                    <span for="female"  style="width:70px;">Žensko</span>
                    </td>
                    <td>
                    <input type="radio" id="other" name="gender" value="Ostalo" v-bind:checked="gender=='Ostalo '"  style="width:70px;">
                    <span for="other"  style="width:70px;">Ostalo</span>
                    </td>
                    </tr>
                </div>
            </div>

            <div v-bind:hidden="role!='guest'">
            <div class = "username">
            <label class="username2" style="text-decoration:underline;" v-on:click="viewMyReservations">Pregled mojih rezervacija</label>
            </div>
            </div>

            <div v-bind:hidden="role!='host'">
            <div class = "username">
            <label class="username2" style="text-decoration:underline;" v-on:click="viewMyApartments">Pregled mojih apartmana</label>
            </div>
            </div>

            </div>
            <p style="color:red;margin-left:200px;">{{errorMessage}}</p>
            
        </div>
     
  
        <div v-bind:hidden="editMode==true">
        <button class="profile-view-button" v-on:click="editProfile">Izmena profila</button>
        
            
        </div>

        <div  v-bind:hidden="editMode==true">
        <button class="profile-view-button" v-on:click="changePass">Promena lozinke </button>
        </div>
        
    
        <div v-bind:hidden="editMode!=true" class="button-save-profile-view">
        <button class="save-button" style="float:left" type="button" v-on:click="UpdateUser"> Sačuvaj izmene </button>
        <button class="save-button" v-on:click="cancelEdit" style="float:left" type="button"> Odustani</button>
        </div>

    </div>
     ` ,

    mounted () {
        axios 
        .get('/user/isThisMe/' + this.$route.query.id)
        .then(response => {
            if(response.data != null)
            { 
                this.id=response.data.currentUser.id;
                this.name=response.data.currentUser.name;
                this.surname=response.data.currentUser.surname;
                this.username=response.data.currentUser.username;
                
                this.profileImage=response.data.currentUser.profilePicture;
                if (response.data.currentUser.gender == 'Female') {
                	this.gender = "Žensko";
                } else if(response.data.currentUser.gender == 'Male'){
                	this.gender = "Muško";
                }
                else
                {
                    this.gender = "Ostalo";
                }
                if (response.data.isThisMe) {
                	this.isThisMe = true;
                } else {
                	this.isThisMe = false;
                }
        		console.log(this.username);
        		console.log("adjsadkfjsdkfjsa");

            } else {
            	this.isThisMe = false;
            	console.log("AGASFASFas");
                console.log(this.$route.query.id);
            }

            if (response.data.currentUser.role == "Guest") {
                this.role = 'guest';
            } else if (response.data.currentUser.role == "Host") {
                this.role = 'host';
            } else if (response.data.currentUser.role == "Administrator") {
                this.role = 'admin';
            } 
            
        })
    },
    methods : {
        changePass: function()
        {
            this.$router.push("/change_pass");
        },

        editProfile: function()
        {
            this.editMode=true;
        },
        cancelEdit: function()
        {
            this.editMode=false;
        },
        UpdateUser: function()
        {
            let userParameters={
                id:this.id,
                name : this.name,
    			surname : this.surname,
                gender : this.gender,
                profileImage:this.profileImage

            };
            axios
            .post("/user/updateUser", JSON.stringify(userParameters))
            .then(response => {
                if (response.data == null) {
                    window.location.href = "#/profile_view";
                } else {
                    window.location.href = "#/profile_view";
                }
            })
            this.editMode=false;
        },
        viewMyReservations: function(){
            window.location.href = "http://localhost:8088/#/reservations?id=" + this.username;
        },
        viewMyApartments:function(){
            window.location.href = "http://localhost:8088/#/my_apartments";
        }
    }
});