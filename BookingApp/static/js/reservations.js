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
			options : [],
			sort_type : "",
			byUsername : ""
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
                        <input type="radio" id="highest" v-model="sort_type" class = "sortbycost" name="sortbycost" value="ascending">
                        <p class = "sortbydate-font">Najskuplje</p>
                    </div>
                    <div class = "col-date">
                        <input type="radio" id="lowest" v-model="sort_type" class = "sortbycost" name="sortbycost" value="descending">
                        <p class = "sortbydate-font">Najjeftinije</p>
                    </div>
                    <button @click="uncheckRadioCost" class = "button-x"> <i class="material-icons">close</i> </button>
                
                </div>
            </div>
            <div class = "bystatus">
                <h1 class="filter-reservations">Statusu:</h1>
              		<div id="example">
						  <select id="multiselect"    class="form-control" name="amenity" multiple="multiple">       
						  </select>
						</div>

            </div>
            <div  v-bind:hidden="mode=='guest'">
            <div class = "bystatus">
                <h1 class="filter-reservations">Korisničko ime:</h1>
              	<input type="text" v-model="byUsername">

            </div>
            </div>
            
            <button class = "submit" @click="search"> Pretraži </button>

        </div>

        <div class="reservations">
            <div class = "row-reservations" v-for = "r in reservations">
                <div class="col-with-picture">
                    <h1 class = "reservation-destination">{{r.apartment.apartmentTitle}}</h1>
                    <p class = "reservation-date">Datum rezervacije: {{parseDate(r.startDate)}} do {{parseDate(r.endDate)}}</p>
                    <div class = "col-picture">
                        <div>				
							<img :src="r.apartment.apartmentPictures[0]" class= "reservation-image" alt = "a.apartmentTitle">
                        </div>
                    </div>
                </div>
                <div class="col-informations">
                    <h1 class = "info-reservation" v-if="r.apartment.active==false">Apartman trenutno nije aktivan.</h1>
                    <h1 class = "info-reservation">Broj noćenja: {{r.numberOfNights}}</h1>
                    <h1 class = "info-reservation">Status: {{getStatus(r)}}</h1>
                    <p class = "reservation-date">Poruka o rezervaciji: {{r.message}}</p>
                    <h1 class = "info-reservation" v-if="r.apartment.costCurrency == 'Euro'">Ukupna cena: {{r.cost}} eura</h1>
                    <h1 class = "info-reservation" v-if="r.apartment.costCurrency == 'Dollar'">Ukupna cena: {{r.cost}} dolara</h1>
                    <h1 class = "info-reservation" v-if="r.apartment.costCurrency == 'Dinar'">Ukupna cena: {{r.cost}} dinara</h1>
                    <h1 class = "info-reservation">{{r.apartment.location.address.address}}, {{r.apartment.location.address.city.city}}, {{r.apartment.location.address.city.state.state}}  </h1>

                    <h1 class = "info-reservation" v-if="mode!='guest'">Korisničko ime gosta: {{r.guest.username}}</h1>
                    <h1 class = "info-reservation" v-if="mode!='host'">Korisničko ime domaćina: {{r.apartment.hostUsername}}</h1>

                    <div class="more-buttons">
                			<div v-if="mode=='guest'">
                            <div class = "one-button" v-if="r.apartment.active==true">
                                <div class = "icons">
                                    <i class="material-icons">information</i>
                                </div>
                                <a  :href="'#/details?id=' + r.apartment.id" class = "link">Pregledaj apartman</a>
                            </div> 
                            </div>
                            <div v-else>
                                <div class = "one-button">
                                <div class = "icons">
                                    <i class="material-icons">information</i>
                                </div>
                                <a  :href="'#/details?id=' + r.apartment.id" class = "link">Pregledaj apartman</a>
                            </div> 
                            </div>
                            <div  v-if="mode=='host'">
	                            	<div v-if="r.apartment.active==true">
	                            	<div v-if="r.status == 'Created'" class = "one-button">
	
		                                <div class = "icons">
		                                    <i class="material-icons">menu</i>
		                                </div>   
		                               	<a class="link" href="#" v-on:click="acceptReservation(r)">Prihvati rezervaciju</a>
		                           </div>
		                        </div>
		                        <div  v-if="mode=='host'">
		                            <div  v-if="r.status == 'Created'" class = "one-button">
			                        	<div class = "icons">
			                            	<i class="material-icons">menu</i>
			                            </div>   
		                               	<a class="link" href = "#" v-on:click="declineReservation(r)">Odbij rezervaciju</a>
		                            </div>
		                        </div>
		                        <div v-if="mode=='host'">
		                        
		                            <div v-if="r.status=='Accepted'" class = "one-button" >
		                        	<div class = "icons">
		                            	<i class="material-icons">menu</i>
		                            </div>   
		                            	<a class="link" href="#" v-on:click="declineReservation(r)" >Odbij rezervaciju</a>
		                            </div>
		                       </div>
		                        <div v-if="mode=='host'">
		                        	<div  v-if="isFinished(r)" class = "one-button" >
		                        	<div class = "icons">
		                            	<i class="material-icons">menu</i>
		                            </div>  
		                            
		                            	<a class="link" href="#" v-on:click="finishReservation(r)">Završi rezervaciju</a>
		                           	</div>
	                           	</div>
	                       </div>               
                            <div>
                           		
                           		<div v-if="mode=='guest'">
                           			<div v-if="r.apartment.active==true">
		                           		<div v-if="r.status=='Accepted'"   class = "one-button">
				                        	<div class = "icons">
				                            	<i class="material-icons">menu</i>
				                            </div>   
			                            	<a class="link" href="#" v-on:click="withdrawReservation(r)" >Otkaži rezervaciju</a>
			                            </div>
		                           		<div v-if="r.status=='Created'"  class = "one-button">
				                        	<div class = "icons">
				                            	<i class="material-icons">menu</i>
				                            </div>   
			                            	<a class="link" href="#" v-on:click="withdrawReservation(r)" >Otkaži rezervaciju</a>
			                            </div>
			                        </div>
                           		</div>
                            </div>          
                                            
                 </div>

            </div>
        </div>
    </div>
</div>

	
	`,
	
	mounted() {

    	axios
    		.get("reservations/canISee")
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
    	
		axios
			.get("/apartment/reservationsForUser")
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
		    			console.log("asdsad");
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
			caption : "Otkazane",
			value : 5
		});
		
		this.mySelect.loadSource(this.options);
	},
	
	methods : {
		parseDate : function(date) {
			return moment(date).format("DD.MM.YYYY."); 
		},
		getStatus : function(r) {
			if (r.status == 'Created') {
				return 'Kreirano';
			} else if (r.status == 'Accepted') {
				return 'Prihvaćeno';
			} else if (r.status == 'Declined') {
				return 'Odbijeno';
			} else if (r.status == 'Withdrawn') {
				return 'Otkazano';
			} else if (r.status == 'Finished') {
				return 'Završeno';
			} else {
				return "";
			}
		},
		uncheckRadioCost : function() {
			document.getElementById('highest').checked = false;
			document.getElementById('lowest').checked = false;
			this.sort_type = "";
		},
		isFinished : function(r) {
			if (r.status == 'Accepted' && new Date(moment(r.startDate).format("DD.MM.YYYY.")).getTime() >= new Date().getTime()) {
				return true; 
			} else {
				return false;
			}
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
					

					if (this.sort_type != "" || this.mySelect.getData().length != 0) {
						this.search();	
					} else {
						axios
						.get("/apartment/reservationsForUser")
						.then(response => {
							this.reservations = response.data;
						});
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
				
				if (this.sort_type != "" || this.mySelect.getData().length != 0) {
					this.search();	
				} else {
					axios
					.get("/apartment/reservationsForUser")
					.then(response => {
						this.reservations = response.data;
					});
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

				if (this.sort_type != "" || this.mySelect.getData().length != 0) {
					this.search();	
				} else {
					axios
					.get("/apartment/reservationsForUser")
					.then(response => {
						this.reservations = response.data;
					});
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

				if (this.sort_type != "" || this.mySelect.getData().length != 0) {
					this.search();	
				} else {
					axios
					.get("/apartment/reservationsForUser")
					.then(response => {
						this.reservations = response.data;
					});
				}
			});
		},
		message : function() {
			toast("wut");
		},
		search : function() {
			let ascending = false;
			let descending = false;
			if (this.sort_type === 'ascending') {
				ascending = true;
			} else if (this.sort_type === 'descending') {
				descending = true;
			}
			let statuses = [];
			for (value of this.mySelect.getData()) {
				console.log(value);
				if (value == 1) {
					statuses.push('Created');
				} else if (value == 2) {
					statuses.push('Accepted') 
				} else if (value == 3) {
					statuses.push('Declined');
				} else if (value == 4) {
					statuses.push('Finished');
				} else if (value == 5) {
					statuses.push('Withdrawn');
				}
			}
			
			let parameters = {
					ascending : ascending,
					descending : descending, 
					status : statuses,
					username : this.byUsername
			}
			axios
				.post("apartment/filterReservations", JSON.stringify(parameters))
				.then (response => {
					if(response.data != null) {
						this.reservations = response.data;
					} else {
						toast("Došlo je do neke greške!");
					}
				});
		}
	}
	
});