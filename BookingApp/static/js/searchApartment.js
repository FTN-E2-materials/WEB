Vue.component("search-apartment", {
	data : function() {
		return {
			apartments : null,
			locations : null,
			locationSearch : "",
			isOpen : false,
			allLocations : null,
			startDate : null,     
			disabledDates: {
		          to: new Date(Date.now() - 8640000)
	        },
	        roomNum : "",
	        guestNum : "",
	        endDate : null,
	        showResults : false,
	        apartments : null
		}
	},
	template: `
	
	<div>
        <div class = "booking-section">
            <form class="form-inline">
                <div class = "row">
                    <div class = "column">
                        <label for="destination">Destinacija:</label>
                        <input type="text" id="email" placeholder="Mesto, Država" v-model="locationSearch" name="dest">
                    </div>
                    <div class = "column">
                        <label for="rooms">Broj soba:</label>
                        <input type="number" id="roomNumber" class = "number" v-model="roomNum" name="roomNumber">
                    </div>
                    <div class = "column">
                        <label for="guests">Broj gostiju:</label>
                        <input type="number" id="guestNumber" class = "number" v-model="guestNum" name="guestNumber">
                        </div>
                    <div class="column" >
                        <label for="startDate">Početni datum:</label>
                        <vuejs-datepicker name="startDate" type="date" v-model="startDate" :disabledDates="disabledDates" format="dd.MM.yyyy."></vuejs-datepicker>
                    </div>
                    <div class = "column">
                        <label for="endDate">Krajnji datum:</label>
                        <vuejs-datepicker name="startDate" type="date" v-model="endDate" :disabledDates="disabledDates" format="dd.MM.yyyy."></vuejs-datepicker>
                    </div>

            </div>
              </form>
                          <button type="submit" v-on:click="findAvailable" class = "form_button">Pretraži</button>
        </div>

        <div class="reservations-booking" v-bind:hidden="showResults==false">
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
                    <h1 class = "info-reservation">Cena po noći: {{a.costForNight}}</h1>

                    <div class="more-buttons">
                            <div class = "one-button" hidden>
                                <div class = "icons">
                                    <i class="material-icons">comments</i>
                                </div>
                                <a href = "apartment.html" class = "link">Komentari</a>
                            </div>
                            <div class = "one-button">
                                <div class = "icons">
                                    <i class="material-icons">information</i>
                                </div>
                                <a :href="'#/details?id=' + a.id" class = "link">Pregledaj apartman</a>
                            </div>                            
                            <div hidden class = "one-button">
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
	`,
	mounted () {
		axios 
			.get("/test")
			.then(response => {
				console.log("i did it");
			})
	},
	methods : {

		findAvailable : function() {
			console.log(this.startDate);
			
			let start = null;
			
			if (this.startDate != null) {
				start = moment(this.startDate).format('DD.MM.YYYY.');
			}
			let end = null;
			
			if (this.endDate != null) {
				end = moment(this.endDate).format('DD.MM.YYYY.');
			}
			
			
			
			let searchParameters = {
				location : this.locationSearch,
				numberOfGuests : this.guestNum,
				numberOfRooms : this.roomNum,
				dateFrom : start,
				dateTo : end
			}
			console.log(searchParameters.dateFrom);
				
				axios
					.post("/apartments/getAvailable", JSON.stringify(searchParameters))
					.then(response => {
						this.apartments = response.data;
					})
				this.showResults = true;
			}
		},
	components : { 
		vuejsDatepicker
	}
});