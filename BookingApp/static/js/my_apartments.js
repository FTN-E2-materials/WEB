Vue.component("my_apartments", {
    data: function(){
        return {
            apartments:null,
            picture: "",
			options : [],
            activeMode : true,
			mySelect : null,
			ascending : false,
			descending : false,
			sort_type : "",
			apt_type : ""
        }
    },

    template: `
    <div class="apartment-filter">
    <h2>Moji apartmani</h2>
    <div class="active-or-not">
        <button class="filter-aparments-btn" v-on:click="getActive">Aktivni apartmani</button>
        <button class="filter-aparments-btn" v-on:click="getInactive">Neaktivni apartmani</button>
        <button class="filter-aparments-btn" v-on:click="addApartment"" >Dodaj novi apartman</button>
    </div>
    
    		<div class = "filters-apt" v-bind:hidden = "activeMode == false">
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
    <div class="list-of-apartments" v-for = "a in apartments">
        <div class = "apartment-row">
           
            <div class = "apartment-column-image">
                <h1 class="apartment-name">{{a.apartmentTitle}}</h1>
                <div>
                <img :src="a.apartmentPictures[0]" alt = "Profile Image" class="image-apartment">
                </div>
            </div> 
                <div class="more-buttons-ap">
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
                        <a v-if="a.active" href = "#" @click="deactivateApartment(a)" class = "link">Promeni status u neaktivan</a>
                        <a v-else href = "#" @click="activate(a)"  class = "link">Promeni status u aktivan</a>
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
        addApartment: function()
        {
            this.$router.push("/add_apartment");
        }, 
        getActive : function() {
        	this.activeMode = true;
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
        getInactive : function() {
        	this.activeMode = false;
        	axios
				.get("/apartment/getInactiveForHost" )
				.then(response => {
					if (response.data == null) {
						console.log(this.apartments);
					}
					else {
						this.apartments = response.data;
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
	        		.post("apartment/filterAptForHost", JSON.stringify(send))
	        		.then(response => {
	        			for (a of response.data) {
	        				console.log(a.apartmentTitle);
	        			}
	        			console.log("asdsa");
	        			this.apartments = response.data;
	        		})
	
			
	      
		},
		deactivateApartment : function(a) {
			axios 
				.put("apartment/deactivate/" + a.id)
				.then(response => {
					if (response.data == null) {
						console.log(this.apartments);
					}
					else {
						this.apartments = response.data;
					}
					
				});
		},
		activate : function(a) {
			axios 
				.put("apartment/activate/" + a.id)
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