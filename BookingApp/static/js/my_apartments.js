Vue.component("my_apartments", {
    data: function(){
        return {
            apartments:null,
            picture: ""
        }
    },

    template: `
    <div class="apartment-filter">
    <h1>Moji apartmani</h1>
    <div class="active-or-not">
        <button class="filter-aparments-btn" v-on:click="getActive">Aktivni apartmani</button>
        <button class="filter-aparments-btn" v-on:click="getInactive">Neaktivni apartmani</button>
        <button class="filter-aparments-btn" v-on:click="addApartment"" >Dodaj novi apartman</button>
    </div>

    <div class="list-of-apartments" v-for = "a in apartments">
        <div class = "apartment-row">
           
            <div class = "apartment-column-image">
                <h1 class="apartment-name">{{a.apartmentTitle}}</h1>
                <div>
                <img :src="a.apartmentPictures[0]" alt = "Profile Image" class="image-apartment">
                </div>
                <div class="more-buttons-ap">
                    <div class = "one-button-ap">
                        <div class = "icons">
                            <i hidden class="material-icons">comments</i>
                        </div>
                        <a href = "apartment.html" class = "link">Komentari</a>
                    </div>
                    <div class = "one-button-ap">
                        <div class = "icons">
                            <i class="material-icons">information</i>
                        </div>
                        <a :href="'#/details?id=' + a.id" class = "link">Pregledaj apartman</a>
                    </div>                            
                    <div hidden class = "one-button-ap">
                        <div class = "icons">
                            <i class="material-icons">edit</i>
                        </div>
                        <a href = "apartment.html" class = "link">Promeni status</a>
                    </div>
                </div>

            </div>
           </div>
    </div>
</div>
     ` ,

    mounted () {
        axios
			.get("/apartment/getActiveForHost")
			.then(response => {
				if (response.data == null) {
					console.log(this.apartments);
				}
				else {
					this.apartments = response.data;
				}
			})
        
       
    },
    methods : {
        addApartment: function()
        {
            this.$router.push("/add_apartment");
        }, 
        getActive : function() {
			.get("/apartment/getActiveForHost")
			.then(response => {
				if (response.data == null) {
					console.log(this.apartments);
				}
				else {
					this.apartments = response.data;
				}
			})
        },
        getInactive : function() {
			.get("/apartment/getInactiveForHost" )
			.then(response => {
				if (response.data == null) {
					console.log(this.apartments);
				}
				else {
					this.apartments = response.data;
				}
			})
        }
    }
});