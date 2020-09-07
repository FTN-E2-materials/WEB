Vue.component("amenities", {
	data : function() {
		return {
			amenities : null,
			amenityName : "",
			addMode : true,
			currentOption: "Dodajte novi sadržaj",
			currentAmenity : "",
			selectedAmenity : null,
			deleteMode : false,
			editMode : false,
			error : ""
		}
	},
	
	template : `
	
    <div class = "amenities">
        <div class = "list-of-amenities">
            <h2 class="list-title">Lista mogućih sadržaja apartmana</h2>
                <div class = "amenity" v-for="a in amenities" >
                    <p class="single-amenity">{{a.amenityName}}</p>
                    <div class = "options-amenity">
                        <button v-on:click="editAmenity(a)" class = "edit-delete">
                            <i class="material-icons">edit</i>
                        </button>
                        <button v-on:click="deleteAmenity(a)" class = "edit-delete">
                            <i class="material-icons">delete</i>
                        </button>
                    </div>
                </div>
        </div>
		
		<div  v-bind:hidden="addMode==false">
        <div class="add-edit-amenity">
            <p class = "add-edit-amenity-text">Dodajte novi sadržaj</p>

            <input type="text" class = "input-amenity" v-model="currentAmenity" placeholder="Naziv sadržaja">
            <button v-on:click="addAmenity" class="submit-amenity">Dodaj</button>
        </div>
        </div>
        
        <div  v-bind:hidden="editMode==false">
        <div class="edit-amenity-part">
            <p class = "add-edit-amenity-text">Izmenite postojeći sadržaj</p>

            <input type="text" class = "input-amenity" v-model="currentAmenity" placeholder="Naziv sadržaja">

        </div>
        <p class = "amenity-error">{{error}}</p>
        <div class = "buttons-amenity">
            <button v-on:click="cancelEdit" class="submit-amenity">Otkaži</button>
         	<button v-on:click="sendRequestEdit" class="submit-amenity">Izmeni</button>
         </div>
        </div>
        
        <div v-bind:hidden="deleteMode ==false">
        <div class="delete-amenity-part">
        	<p class = "add-edit-amenity-text"> Da li ste sigurni da zelite da obrisete {{currentAmenity}}?</p>

        </div>
         <div class = "buttons-amenity">
            <button v-on:click="cancelDelete" class="submit-amenity">Otkaži</button>
         	<button v-on:click="sendRequestDelete" class="submit-amenity">Obriši</button>
         </div>
        </div>
    </div>

	`,
	mounted() {
		axios
			.get("/amenities")
			.then(response => {
				if (response.data != null) {
					this.amenities = response.data;
					console.log(this.amenities[0].amenityName)
				} else {
					toast("Uuups! Morate biti admin da biste videli ovo!");
				}
			})
	},
	methods : {
		editAmenity : function(amenity) {
			this.error = "";
			this.addMode = false;
			this.currentAmenity = amenity.amenityName;
			this.selectedAmenity = amenity;
			this.editMode = true;
			this.deleteMode = false;
		},
		sendRequestEdit : function() {
			this.error = "";
			if (this.currentAmenity === "") {
				this.error = "Naziv sadržaja je obavezno polje";
			} else {
				this.selectedAmenity.amenityName = this.currentAmenity;
				axios 
					.post("amenities/editAmenity", JSON.stringify(this.selectedAmenity))
					.then(response => {
						if (response.data != null) {
							toast("Uspešno ste izmenili postojeći sadržaj!");
						}
					})
				this.addMode = true;
				this.currentAmenity = "";
				this.selectedAmenity = null;
				this.editMode = false;
				this.deleteMode = false;
			}
		},
		deleteAmenity : function(amenity) {
			this.error = "";
			this.addMode = false;
			this.currentAmenity = amenity.amenityName;
			this.selectedAmenity = amenity;
			this.deleteMode = true;
			this.editMode = false;
		},
		cancelEdit : function() {
			this.error = "";

			this.addMode = true;
			this.currentAmenity = "";
			this.selectedAmenity = null;
			this.deleteMode = false;
			this.editMode = false;
		}, 
		cancelDelete : function() {
			this.error = "";

			this.addMode = true;
			this.currentAmenity = "";
			this.selectedAmenity = null;
			this.deleteMode = false;
			this.editMode = false;
		},
		sendRequestDelete : function() {
			this.error = "";
			axios 
				.delete("amenities/deleteAmenity/" + this.selectedAmenity.id)
				.then(response => {
					if (response.data != null) {
						toast("Uspešno ste obrisali postojeći sadržaj!");
		    			for(let a of this.amenities){
		    				if(a.id === this.selectedAmenity.id){
		    					const index = this.amenities.indexOf(a);
		    					this.amenities.splice(index, 1);
		    					break;
		    				}
		    			}
					}
				})
			this.addMode = true;
			this.currentAmenity = "";
			this.selectedAmenity = null;
			this.deleteMode = false;
			this.editMode = false;
		}, 
		addAmenity : function() {
			this.error = "";
			if (this.currentAmenity === "") {
				this.error = "Naziv sadržaja je obavezno polje";
			} else {
				axios 
					.put("amenities/addAmenity", JSON.stringify(this.currentAmenity))
					.then(response => {
					if (response.data != null) {
						toast("Uspešno ste dodali sadržaj!");
					}
				})
				this.addMode = true;
				this.currentAmenity = "";
				this.selectedAmenity = null;
				this.deleteMode = false;
				this.editMode = false;
			}
		}
	}
});