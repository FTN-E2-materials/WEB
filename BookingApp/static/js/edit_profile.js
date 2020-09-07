Vue.component("edit_profile",{

	data: function () {
        return {
            name:'',
            surname: '',
            username: '',
            gender: '',
            maleGender:''
        }
},

template: `
<div class="form-part">
<h2>Izmena profila</h2>
<div class = "row-reservations">
    <div class="col-with-picture">
        <div class = "profile-image"> </div>
    </div>
    <div class="col-informations">
        <div class = "username">
            <label class="username2">Ime:</label>
                <div class = "col-username2">
                    <input type="text" name = "name" v-model="name">
                </div>
           
        </div>
    
        <div class = "username">
            <label class="username2">Prezime:</label>
            <div class = "col-filters">
                <div class = "col-username2">
                    <input type="text" name = "surname" v-model="surname" >
                </div>
            </div>
        </div>

        <div class = "username">
            <label class="username2">Korisnicko ime:</label>
            <div class = "col-filters">
                <div class = "col-username2">
                    <input type="text" name = "username" v-model="username">
                </div>
            </div>
        </div>

        <div class = "username">
            <label class="username2">Pol:</label>
            <tr class="radio_button">
	<td>
	<input type="radio" id="male" name="gender" value="Muško" v-bind:checked="gender=='Male'" style="width:70px;">
	<span for="male" style="width:70px;">Muško</span>
	</td>
	<td>
	<input type="radio" id="female" name="gender" value="Žensko" v-bind:checked="gender=='Female'"   style="width:70px;">
	<span for="female"  style="width:70px;">Žensko</span>
	</td>
	<td>
	<input type="radio" id="other" name="gender" value="Ostalo" v-bind:checked="gender=='Other'"  style="width:70px;">
	<span for="other"  style="width:70px;">Ostalo</span>
	</td>
	</tr>
        </div>
        </div>

        
    </div>
    

    <div>
        <label class="username2">Moje Rezervacije:</label>
        
    </div>

    <div>
        <label class="username2">Moji apartmani:</label>
        
    </div>
    <div class="box">
        <button class="save-button" style="float:left" type="button"> Sacuvaj izmene </button>
        <button class="save-button" style="float:left" type="button"> Odustani</button>
    </div>
    </div>
`, 

mounted () {
    axios 
    .get('/user/seeIfLogged')
    .then(response => {
        if(response.data != null)
        {
            this.name=response.data.name;
            this.surname=response.data.surname;
            this.username=response.data.username;
            this.gender=response.data.gender;
            this.maleGender=true;

        }
        

    })
},
methods : {
   
}
});