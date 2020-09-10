Vue.component("reservations", {
	data : function() { 
		return {
			reservations : null,
			user : null,
			date : "",
			cost : "",
			status : "",
			currency : "",
			mode : "notLogged",
			mySelect : null,
			options : []
		}
	},
	
	template: `
	
    <div class="page">
        <div class="filters">
            <h1>Sortiraj po:</h1>
            <div class = "bycost">
                <h1 class="filter-reservations">Ceni:</h1>
                <div class = "col-filters">
                    <div class = "col-date">
                        <input type="radio" id="highest" class = "sortbycost" name="sortbycost" value="Najskuplje">
                        <p class = "sortbydate-font">Najskuplje</p>
                    </div>
                    <div class = "col-date">
                        <input type="radio" id="lowest" class = "sortbycost" name="sortbycost" value="Najjeftinije">
                        <p class = "sortbydate-font">Najjeftinije</p>
                    </div>
                </div>
            </div>
            <div class = "bystatus">
                <h1 class="filter-reservations">Statusu:</h1>
              		<div id="example">
						  <select id="multiselect"    class="form-control" name="amenity" multiple="multiple">       
						  </select>
						</div>

            </div>

        </div>

        <div class="reservations">
            <div class = "row-reservations" v-for = "r in reservations">
                <div class="col-with-picture">
                    <h1 class = "reservation-destination">{{r.apartment.apartmentTitle}}</h1>
                    <p class = "reservation-date">Datum rezervacije: {{parseDate(r.startDate)}}</p>
                    <div class = "col-picture">
                        <div>				
							<img :src="r.apartment.apartmentPictures[0]" class= "reservation-image" alt = "a.apartmentTitle">
                        </div>
                    </div>
                </div>
                <div class="col-informations">
                    <h1 class = "info-reservation">Broj noćenja: {{r.numberOfNights}}</h1>
                    <h1 class = "info-reservation" v-if="r.status=='Accepted'">Status: Prihvaceno</h1>
                    <h1 class = "info-reservation" v-if="r.status=='Rejected'">Status: Odbijeno</h1>
                    <h1 class = "info-reservation" v-if="r.status=='Withdrawn'">Status: Otkazano</h1>
                    <h1 class = "info-reservation" v-if="r.status=='Created'">Status: Kreirano</h1>
                    <h1 class = "info-reservation" v-if="r.status=='Finished'">Status: Zavrseno</h1>
                    <p class = "reservation-date">Poruka o rezervaciji: {{r.message}}</p>
                    <h1 class = "info-reservation" v-if="r.apartment.costCurrency == 'Euro'">Ukupna cena: {{r.cost}} eura</h1>
                    <h1 class = "info-reservation" v-if="r.apartment.costCurrency == 'Dollar'">Ukupna cena: {{r.cost}} dolara</h1>
                    <h1 class = "info-reservation" v-if="r.apartment.costCurrency == 'Dinar'">Ukupna cena: {{r.cost}} dinara</h1>

                    <h1 class = "info-reservation">Korisnicko ime gosta: {{r.guest.username}}</h1>

                    <div class="more-buttons">
                            <div class = "one-button">
                                <div class = "icons">
                                    <i class="material-icons">information</i>
                                </div>
                                <a  :href="'#/details?id=' + r.apartment.id" class = "link">Pregledaj apartman</a>
                            </div>                          
                        </div>
                    </div>                    
                            <div class = "one-button">
                                <button class = "submit" v-on:click="acceptReservation(r)"  v-if="r.stauts=='Created' && mode=='host'">Prihvati rezervaciju</button>
                                <button class = "submit" v-on:click="declineReservation(r)" v-if="(r.stauts=='Created' && mode=='host') || (r.status == 'Accepted' && mode=='host')">Odbij rezervaciju</button>
                                <button class = "submit" v-on:click="finishReservation(r)" v-if="r.stauts=='Accepted' && isFinished(r.startDate) == true && mode=='host'">Završi rezervaciju</button>
                                <button class = "submit" v-on:click="withdrawReservation(r)" v-if="r.stauts=='Accepted'== true && mode=='guest'">Otkaži rezervaciju</button>
                                <button class = "submit" v-on:click="withdrawReservation(r)" v-if="r.stauts=='Created' == true && mode=='host'">Otkaži rezervaciju</button>
                            </div>                          
                        </div>
                </div>
               
            </div>


        </div>

	
	`,
	
	mounted() {
		axios
			.get("/apartments/reservations/" + this.$route.query.id)
			.then(response => {
				this.reservations = response.data;
			});

		axios
			.get("/user/seeIfLogged")
			.then(response => {
	    		if (response.data == null) {
	    			this.mode = 'notLogged';
	    		} else 
	    		{
	    			if (response.data.role == "Guest") {

	    				this.mode = 'guest';
	    			} else if (response.data.role == "Host") {
		    			this.mode = 'host';
		    		} else if (response.data.role == "Administrator") {
		    			this.mode = 'admin';
		    		} else {
		    			this.mode = 'notLogged';
		    		}
	    		}
	    		toast("hello");
	    		console.log(this.mode);
	    	})
	    	
	    	
			this.mySelect = new MSFmultiSelect(
				document.querySelector('#multiselect'),
					{
						appendTo: '#example',
						selectAll: true,
						      
					}	
				)
		
		this.options.push({
			caption : "Kreirana",
			value : 1
		});
		this.options.push({
			caption : "Prihvaćena",
			value : 2
		});	    				
		this.options.push({
			caption : "Odbijena",
			value : 3
		});
		this.options.push({
			caption : "Završena",
			value : 4
		});
		this.options.push({
			caption : "Odustanak",
			value : 5
		});
		
		this.mySelect.loadSource(this.options);
	},
	
	methods : {
		parseDate : function(date) {
			return moment(date).format("DD.MM.YYYY."); 
		},
		
		isFinished : function(date) {
			return moment(date).format("DD.MM.YYYY.").isBefore(moment())
		},
		acceptReservation : function(reservation) {
			axios
				.put("apartments/acceptReservation/" + reservation.id)
				.then(response  => {
					if (response.data != null) {
						toast("Rezervacija prihvaćena!");
					} else {
						toast("O ne, dogodila se greška prilikom prihvatanja rezervacije!");
					}
				});
		},
		declineReservation : function(reservation) {
			axios
			.put("apartments/declineReservation/" + reservation.id)
			.then(response  => {
				if (response.data != null) {
					toast("Rezervacija odbijena!");
				} else {
					toast("O ne, dogodila se greška prilikom prihvatanja rezervacije!");
				}
			});
		},
		withdrawReservation : function(reservation) {
			axios
			.put("apartments/withdrawReservation/" + reservation.id)
			.then(response  => {
				if (response.data != null) {
					toast("Rezervacija otkazana!");
				} else {
					toast("O ne, dogodila se greška prilikom prihvatanja rezervacije!");
				}
			});
		}, 
		finishReservation : function(reservation) {
			axios
			.put("apartments/finishReservation/" + reservation.id)
			.then(response  => {
				if (response.data != null) {
					toast("Status prepravljen u 'završeno'!");
				} else {
					toast("O ne, dogodila se greška prilikom prihvatanja rezervacije!");
				}
			});
		},
		message : function() {
			toast("wut");
		}
	}
	
});