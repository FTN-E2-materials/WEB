
function cyrilicToLatinic(string) {
    var cyrillic = 'А_Б_В_Г_Д_Ђ_Е_Ё_Ж_З_И_Й_Ј_К_Л_Љ_М_Н_Њ_О_П_Р_С_Т_Ћ_У_Ф_Х_Ц_Ч_Џ_Ш_Щ_Ъ_Ы_Ь_Э_Ю_Я_а_б_в_г_д_ђ_е_ё_ж_з_и_й_ј_к_л_љ_м_н_њ_о_п_р_с_т_ћ_у_ф_х_ц_ч_џ_ш_щ_ъ_ы_ь_э_ю_я'.split('_')
    var latin = 'A_B_V_G_D_Đ_E_Ë_Ž_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_Ć_U_F_H_C_Č_Dž_Š_Ŝ_ʺ_Y_ʹ_È_Û_Â_a_b_v_g_d_đ_e_ë_ž_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_ć_u_f_h_c_č_dž_š_ŝ_ʺ_y_ʹ_è_û_â'.split('_')

    return string.split('').map(function(char) {
      var index = cyrillic.indexOf(char)
      if (!~index)
        return char
      return latin[index]
    }).join('')
  }


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
		          to: new Date(Date.now())
	        },
	        roomNum : "",
	        guestNum : "",
	        endDate : null,
	        showResults : false,
	        cost : "",
	        filters : false,
	        filters_show : false,
	        mySelect : null,
			currentAmenities : [],
			mySelect : null,
			ascending : false,
			descending : false,
			sort_type : "",
			apt_type : "",
			options : [],
			autocompleteInstance : [],
			
		}
	},
	template: `
	
	<div>
        <div class = "booking-section">
            <form class="form-inline">
                <div class = "row">
                    <div class = "column">
                        <label for="destination">Destinacija:</label>
						 <input
						      type="search"
						      id="autocomplete-dataset"
						      class="form-control"
						      placeholder="Destinacija"
						      name="dest"
						    />
						 </div>
                    <div class = "column2">
                        <label for="destination">Cena do (u €):</label>
                        <input type="number" id="cost" min="1"  class = "number" v-model="cost" name="dest">
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
                        <vuejs-datepicker style="margin-top: 11px;"  name="startDate" type="date" v-model="startDate" :disabledDates="disabledDates" format="dd.MM.yyyy."></vuejs-datepicker>
                    </div>
                    <div class = "column">
                        <label for="endDate">Krajnji datum:</label>
                        <vuejs-datepicker name="startDate" style="margin-top: 11px;" type="date" v-model="endDate" :disabledDates="disabledDates" format="dd.MM.yyyy."></vuejs-datepicker>
                    </div>

            </div>
            
              </form>
              
              <button type="submit" v-on:click="findAvailable" class = "form_button">Pretraži</button>
              <div v-bind:hidden="filters == false">
              	<i class="material-icons" style="margin-left:10px;">filter_list</i> <a href="#/search" @click="showFilters" style="margin-left:5px;">Filteri</a>
              	
              	<div v-bind:hidden="filters_show == false">
	              	
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
	            <button class = "submit" @click="search"> Filtriraj </button>

              	</div>
              </div>
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
					<h1 class = "info-reservation" v-if="a.costCurrency=='Euro'">Cena po noći: {{a.costForNight}} € </h1>
                    <h1 class = "info-reservation" v-if="a.costCurrency=='Dollar'">Cena po noći: {{a.costForNight}} $ </h1>
                    <h1 class = "info-reservation" v-if="a.costCurrency=='Dinar'">Cena po noći: {{a.costForNight}} RSD</h1>
                    <h1 class = "info-reservation">{{a.location.address.address}}, {{a.location.address.city.city}}, {{a.location.address.city.state.state}}  </h1>


                    <div class="more-buttons">
                            <div class = "one-button">
                                <div class = "icons">
                                    <i class="material-icons">information</i>
                                </div>
                                <a :href="'#/details?id=' + a.id" class = "link">Pregledaj apartman</a>
                            </div>                            
                        </div>
                    </div>
                </div>
                

        </div>
        <input type="text" id="city" hidden>
        <input type="text" id="country" hidden>
        
        </div>
	`,
	mounted () {
		axios 
			.get("/test")
			.then(response => {
				console.log("i did it");
			})
			
			
		/*
		this.places = places({
	        appId: 'plQ4P1ZY8JUZ',
	        apiKey: 'bc14d56a6d158cbec4cdf98c18aced26',
	        container: document.querySelector('#destination'),
			templates: {
				value: function(suggestion) {
			        return suggestion.name;
				}
		    }
		}).configure({
			    type: 'city'
		});

		this.places.on('change', function getLocationData(e) {		
			document.querySelector('#destination').value = e.suggestion.value || '';
		});
		
		*/
			
		  var placesCountry = placesAutocompleteDataset({
          algoliasearch: algoliasearch,
          templates: {
            header: '<div class="ad-example-header">Države</div>',
            footer: '<div class="ad-example-footer"/>'
          },
          hitsPerPage: 3,
          type: ["country"],
          getRankingInfo: true
        });

        // create the city dataset from places
        // we automatically inject the default CSS
        // all the places.js options are available
        var placesCity = placesAutocompleteDataset({
          algoliasearch: algoliasearch,
          templates: {
            header: '<div class="ad-example-header">Gradovi</div>'
          },
          hitsPerPage: 3,
          type: ["city"],
          getRankingInfo: true
        });

        // init
        var autocompleteInstance = autocomplete(
          document.querySelector("#autocomplete-dataset"),
          {
            hint: false,
            debug: true,
            cssClasses: { prefix: "ad-example" }
          },
          [placesCountry, placesCity]
        );

        var autocompleteChangeEvents = ["selected", "close"];

        autocompleteChangeEvents.forEach(function(eventName) {
          autocompleteInstance.on("autocomplete:" + eventName, function(
            event,
            suggestion,
            datasetName
          ) {
            console.log(datasetName, suggestion);

            if (suggestion.type === 'city') {
            	document.querySelector("#city").value = suggestion.name || '';
            	document.querySelector("#country").value = suggestion.country || '';
            } else if (suggestion.type === 'country') {
            	document.querySelector("#city").value = '';
            	document.querySelector("#country").value = suggestion.value || '';
            }

        	document.querySelector('#autocomplete-dataset').value = suggestion.value || '';
          });
        });
        

        document.querySelector("#autocomplete-dataset").on("change", evt => {
        	document.querySelector('#autocomplete-dataset').value = e.suggestion.value || '';
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
	},
	methods : {

		findAvailable : function() {
			this.filters = true;
			console.log(this.startDate);
			
			let start = null;
			
			if (this.startDate != null) {
				start = moment(this.startDate).format('DD.MM.YYYY.');
			}
			let end = null;
			
			if (this.endDate != null) {
				end = moment(this.endDate).format('DD.MM.YYYY.');
			}
			
			if (this.cost == "") {
				this.cost = 0;
			}

		    this.locationSearch = cyrilicToLatinic(document.querySelector('#autocomplete-dataset').value);
		    let city = cyrilicToLatinic(document.querySelector('#city').value);
		    let country = cyrilicToLatinic(document.querySelector('#country').value);
		    console.log(this.locationSearch)
			let searchParameters = {
				location : this.locationSearch,
				numberOfGuests : this.guestNum,
				numberOfRooms : this.roomNum,
				dateFrom : start,
				dateTo : end,
				cost : this.cost,
				city : city,
				country : country
			}
			console.log(searchParameters.dateFrom);
				
				axios
					.post("/apartments/getAvailable", JSON.stringify(searchParameters))
					.then(response => {
						this.apartments = response.data;
						if (response.data.length == 0) {
							this.apartments = [];
						}
 					})
				this.showResults = true;
			},
		showFilters : function() {
			this.filters_show = !this.filters_show;
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

	        	for (a of this.mySelect.getData()) {
	        		objectToSend.push({
	        			id : a - 1
	        		});
	        		console.log(a);
	        	}
	        	console.log(this.apartments.length);
	        	
	        	let apartmentsToSend = [];
	        	
	        	for (a of this.apartments) {
	        		apartmentsToSend.push(a.id);
	        		console.log(a.id);
	        	}
	        	
	        	let send = {
	        			list : objectToSend,
	        			ascending : this.ascending,
	        			type : this.apt_type,
	        			descending : this.descending,
	        			apartments : apartmentsToSend
	        	};
	        	
	        	
	        	axios 
	        		.post("apartment/filterSearchedApartments", JSON.stringify(send))
	        		.then(response => {
	        			for (a of response.data) {
	        				console.log(a.apartmentTitle);
	        			}
	        			console.log("asdsa");
	        			this.apartments = response.data;
	        		})
	
			
	      
			}
		},
	components : { 
		vuejsDatepicker
	}
});