

Vue.component("apartments", {
	
	
	data: function() {
		return {
			apartments : null,
			picture : "",
			currency : "", 
			options : [],
			mode : "notLogged",
			value : "",
			filteredApartments : [],
			omg : null,
			currentAmenities : [],
			mySelect : null,
			ascending : false,
			descending : false,
			sort_type : "",
			apt_type : "",
			nonWorking_days:["1-1-2020","2-1-2020","7-1-2020","27-1-2020",,"15-2-2020","16-2-2020","17-2-2020","10-4-2020"
			,"11-4-2020","12-4-2020","13-4-2020","22-4-2020","1-5-2020","2-5-2020","9-5-2020","24-5-2020"
			,"28-6-2020","31-7-2020","28-9-2020","21-10-2020","25-10-2020","11-11-2020","10-9-2020","25-12-2020"]

		
		}
	
	},
	
	template: `
	<div>
	
    
        <div class="filters">
            <h1>Naša ponuda:</h1>
            <div class = "bydate">
            <h1 class="filter-reservations">Sadržaj </h1>
			<div id="example">
			  <select id="multiselect"    class="form-control" name="amenity" multiple="multiple">       
			  </select>
			</div>
			</div>

            <div class = "bycost">
                <h1 class="filter-reservations">Ceni:</h1>
                <div class = "col-filters">
                    <div class = "col-date">
                        <input v-on:change="sorting" v-model="sort_type" type="radio" id="highest" class = "sortbycost" name="sortbycost" value="najskuplje">
                        <p class = "sortbydate-font">Najskuplje</p>
                    </div>
                    <div class = "col-date">
                        <input v-on:change="sorting" v-model="sort_type" type="radio" id="lowest" class = "sortbycost" name="sortbycost" value="najjeftinije">
                        <p class = "sortbydate-font">Najjeftinije</p>
                    </div>
                    	<button @click="uncheckRadioCost" class = "button-x"> <i class="material-icons">close</i> </button>
                </div>
            </div>
            <div class = "bycost">
                <h1 class="filter-reservations">Tip:</h1>
                <div class = "col-filters">
                    <div class = "col-date">
                        <input v-model="apt_type" type="radio" id="room" class = "sortbycost" name="type" value="soba">
                        <p class = "sortbydate-font">Soba</p>
                    </div>
                    <div class = "col-date">
                        <input type="radio" v-model="apt_type" id="apartment" class = "sortbycost" name="type" value="apartman">
                        <p class = "sortbydate-font">Apartman</p>
                    </div>
                    	<button @click="uncheckRadioType" class = "button-x"> <i class="material-icons">close</i> </button>
                </div>
            </div>
            <button class = "submit" @click="search"> Pretraži </button>

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
		axios
			.get("apartments/getActive")
			.then(response => {
				if (response.data == null) {
					
				}
				else {
					this.filteredApartments = [];
					this.apartments = response.data;
					var d = new Date();
					var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
			
				let updatedApartments=[];
				for(let i=0;i<this.apartments.length;i++)
					{
						if(d.getDay()==5 ||d.getDay()==6 ||d.getDay()==0)
						{
							this.apartments[i].costForNight=this.apartments[i].costForNight*0.9;
						}
						if(this.nonWorking_days.includes(datestring))
						{
							this.apartments[i].costForNight=this.apartments[i].costForNight*1.05;
						}
						updatedApartments.push(this.apartments[i]);
					
					}
					this.apartments=updatedApartments;
				}
			});
				

		
		axios 
			.get("/amenities")
			.then(response => {
				for (a of response.data) {
					this.options.push({
						caption : a.amenityName,
						value : a.id
					});
					console.log(a.amenityName);
				}


				this.mySelect = new MSFmultiSelect(
					    document.querySelector('#multiselect'),
					    {
						      appendTo: '#example',
						      selectAll: true,
						      onChange : function(value) {
						    	  console.log(value);
						    	  this.sorting();
						      }
						      
					    }
					 )

				this.mySelect.loadSource(this.options);
				
			});
				
				
			
		
	    axios
	    	.get('/user/seeIfLogged')
	    	.then(response => {
	    		if (response.data != null) {
	    			this.mode = response.data.role;
	    		} else {
	    			this.mode = "notLogged";
	    		}
	    		
	    	})
	    	
	    	console.log(this.apartments.length);
	},
	watch : {
		apartments(value) {
			this.apartments = value;
		}
	},
	computed : {
		filtered : {

		    get: function () {
		      return this.filteredApartments;
		    },
		    // setter
		    set: function (newValue) {
		    	console.log("ASDSASADSAASDSADA");
		    	this.filteredApartments = newValue;
		    	this.filtered = newValue;
		    }
		}
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
						this.filteredApartments = response.data;
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
						this.filteredApartments = response.data;
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
					this.filteredApartments = response.data;
				}
			})
        		
		}, 
		setApartments : function(data) {
			this.filteredApartments = data; 
		},
		mostExpensiveSort : function() {
			axios
			.get("/apartment/getSortedMostExpensive")
			.then(response => {
				if (response.data == null) {
					
				}
				else {
					this.apartments = response.data;
					this.filteredApartments = response.data;
				}
			})
		},
		uncheckRadioCost : function() {
			document.getElementById('highest').checked = false;
			document.getElementById('lowest').checked = false;
			this.sort_type = "";
			this.descending = false;
			this.ascending = false;
		},
		uncheckRadioType : function() {
			document.getElementById('room').checked = false;
			document.getElementById('apartment').checked = false;
			this.apt_type = "";
		},
		sorting : function() {
			if (this.sort_type == 'najskuplje') {
				this.descending = true;
				this.ascending = false;
			} else if (this.sort_type == 'najjeftinije') {
				this.descending = false;
				this.ascending = true;
			} else {
				this.descending = false;
				this.ascending = false;
			}
		},
		search : function() {
			for(a of this.mySelect.getData()) {
				console.log(a);
			}
			
	        	let objectToSend = [];
	        	this.apartments = [];
	        	for (a of this.mySelect.getData()) {
	        		objectToSend.push({
	        			id : a - 1
	        		});
	        		console.log(a);
	        	}
	        	console.log(this.descending);
	        	let send = {
	        			list : objectToSend,
	        			ascending : this.ascending,
	        			type : this.apt_type,
	        			descending : this.descending
	        	};
	        	
	        	axios 
	        		.post("apartment/filterByAmenity", JSON.stringify(send))
	        		.then(response => {
	        			for (a of response.data) {
	        				console.log(a.apartmentTitle);
	        			}
	        			console.log("asdsa");
	        			this.apartments = response.data;
	        		})
	
			
	      
		}
	}
});