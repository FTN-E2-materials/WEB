

Vue.component("apartments", {
	data: function() {
		return {
			apartments : null,
			picture : "",
			currency : "", 
			options : [],
			mode : "notLogged",
			value : ""
		
		}
	
	},
	
	template: `
	<div>
	
    
        <div class="filters">
            <h1>Sortiraj ili filtriraj apartmane:</h1>
            <div class = "bydate" v-if="mode=='Guest'" >
                <h1 class="filter-reservations">Filtriraj po sadržaju apartmana:</h1>
				<select class="multipleSelect" multiple name="amenities">
				    <option v-for="a of options" value="a.name">{{a.name}}</option>
				</select>
            </div>

            <div class = "bycost">
                <h1 class="filter-reservations">Ceni:</h1>
                <div class = "col-filters">
                    <div class = "col-date">
                        <input v-on:change="mostExpensiveSort" type="radio" id="highest" class = "sortbycost" name="sortbycost" value="Najskuplje">
                        <p class = "sortbydate-font">Najskuplje</p>
                    </div>
                    <div class = "col-date">
                        <input v-on:change="cheapestSort" type="radio" id="lowest" class = "sortbycost" name="sortbycost" value="Najjeftinije">
                        <p class = "sortbydate-font">Najjeftinije</p>
                    </div>
                </div>
            </div>
            <div class = "bystatus">
                <h1 class="filter-reservations">Statusu:</h1>
                <div class = "col-filters">
                    <div class = "col-date">

                    </div>
                    <div class = "col-date">

                    </div>
                </div>
            </div>

        </div>
        
        <div class="reservations">
            <div class = "row-reservations" v-for = "a in apartments">
                <div class="col-with-picture">
                    <h1 class = "reservation-destination">{{a.apartmentTitle}}</h1>
                    <p hidden class = "reservation-date">Datum rezervacije: 21.07.2020. </p>
                    <div class = "col-picture">
                        <div>
							<img :src="a.apartmentPictures[0]" class= "reservation-image" alt = "a.apartmentTitle">
                        </div>
                    </div>
                </div>
                <div class="col-informations">
                    <h1 class = "info-reservation">Broj soba: {{a.numberOfRooms}}</h1>
                    <h1 class = "info-reservation">Broj osoba: {{a.numberOfGuests}}</h1>
                    <p hidden class = "reservation-date">Poruka o rezervaciji</p>
                    <h1 class = "info-reservation" v-if="a.costCurrency=='Euro'">Cena po noći: {{a.costForNight}} € </h1>
                    <h1 class = "info-reservation" v-if="a.costCurrency=='Dollar'">Cena po noći: {{a.costForNight}} $ </h1>
                    <h1 class = "info-reservation" v-if="a.costCurrency=='Dinar'">Cena po noći: {{a.costForNight}} RSD</h1>

                    <div class="more-buttons">
                    		<div hidden>
                            <div hidden class = "one-button">
                                <div class = "icons">
                                    <i class="material-icons">comments</i>
                                </div>
                                <a :href="'#/details?comments=1&id=' + a.id" hidden class = "link">Komentari</a>
                            </div>
                            </div>
                            <div class = "one-button">
                                <div class = "icons">
                                    <i class="material-icons">information</i>
                                </div>
                                <a :href="'#/details?id=' + a.id" class = "link">Pregledaj apartman</a>
                            </div>           
                            <div hidden>                 
                            <div hidden class = "one-button">
                                <div class = "icons">
                                    <i class="material-icons">edit</i>
                                </div>
                                <a href = "apartment.html" hidden class = "link">Promeni status</a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                

        </div>
        
        </div>
	`,
	
	mounted ()  {
		$('.multipleSelect').fastselect();
		axios
			.get("apartments/getActive")
			.then(response => {
				if (response.data == null) {
					
				}
				else {
					this.apartments = response.data;
				}
			})
			
		axios 
			.get("/amenities")
			.then(response => {
				for (a of response.data) {
					this.options.push({
						name : a.amenityName,
						id : a.id
					})
				}
			})
		
	    axios
	    	.get('/user/seeIfLogged')
	    	.then(response => {
	    		if (response.data != null) {
	    			this.mode = response.data.role;
	    		} else {
	    			this.mode = "notLogged";
	    		}
	    		
	    	})
	},
	methods : {
		getActive : function() {

			axios
				.get("apartments/getActive")
				.then(response => {
					if (response.data == null) {
						
					}
					else {
						this.apartments = response.data;
						this.picture = response.data[0].apartmentPictures[0];
					}
				})
		},
	
		getInactive : function() {
			axios
				.get("apartments/getInactive")
				.then(response => {
					if (response.data == null) {
						
					} else {
						this.apartments = response.data;
						this.picture = response.data[0].apartmentPictures[0];
					}
				})
		},
		selectApartmentToShow : function(id) {
			window.location.href = "#/details?id=" + id;
		},
		
		cheapestSort : function() {
			axios
			.get("/apartment/getSortedCheapest")
			.then(response => {
				if (response.data == null) {
					
				}
				else {
					this.apartments = response.data;
				}
			})
		}, 
		
		mostExpensiveSort : function() {
			axios
			.get("/apartment/getSortedMostExpensive")
			.then(response => {
				if (response.data == null) {
					
				}
				else {
					this.apartments = response.data;
				}
			})
		},
		
		newestSort : function() {
			
		},
		
		oldestSort : function() {
			
		}, 
		showDestinations : function(destination) {
			axios
				.get("apartment/getApartmentsByCity/" + destination)
				.then(response => {
					if (response.data != null) {
						this.apartments = response.data;
					}
				});
		}
	}
	

});