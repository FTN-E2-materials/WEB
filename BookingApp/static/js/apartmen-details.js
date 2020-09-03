Vue.component("apartment-details", {
	data: function() {
		return {
			apartment: null,
			mainPicture: "",
			pictures: "",
			numOfRows: "",
			picNum: "",
			checkInTime: "",
			checkOutTime: "",
			numOfGuests: "",
			titleOfApartment: "",
			numOfRooms: "",
			host: "",
			apartmentDesc: "",
			costForNight: "", 
			currency: "",
			canEdit : false, 
			canReserve: false,
			comments: null,
			canComment: true,
			textComment: "",
			grade: "",
			user: null,
			amenityDetails: ""
		}
	},
	template: `
		
    <div class = "reservations-details">
        <div class = "apartment-details">
            <div class = "image-column">
                <div>
                	<img :src="mainPicture" class = "image-source" alt = "Glavna slika">
                </div>
            </div>
            <div class = "details-column">
                <div class = "one-info">
                    <p>Vreme ulaska:</p>
                    <p>{{checkInTime}}</p>
                </div>
                <div class = "one-info">
                    <p>Vreme izlaska:</p>
                    <p>{{checkOutTime}}</p>
                </div>
                <div class = "one-info">
                    <p>Broj ljudi:</p>
                    <p>{{numOfGuests}}</p>
                </div>
                <div class = "one-info">
                    <p>Broj soba:</p>
                    <p>{{numOfRooms}}</p>
                </div>
                <div class = "one-info">
                    <p>Cena po noći: </p>
                    <p>{{costForNight}} {{currency}}</p>
                </div>
            </div>
            <div class = "ap-desc">
                <p class="title-desc">OPIS APARTMANA</p>
                <p>{{apartmentDesc}}</p>
                <p>Sadržaj apartmana: {{amenityDetails}}</p>
                </div>
        </div>

        <div class = "other-image-line">
            <div class = "one-image-row" v-for='i in numOfRows' :key='i'>
                <div v-for='j in 3' :key='j'>
					<img v-on:click="changeImage(j+(i-1)*2)" class = "one-image" :src="pictures[j+(i-1)*2]" >
                </div>

            </div>
        </div>
		<div v-bind:hidden="canReserve===false">
        <button  class="submit">Rezerviši?</button>
        </div>
        <div v-bind:hidden="canEdit===false">
        <button  class="submit">Izmeni apartman?</button>
		</div>
        <div class = "comments">
            <p>Komentari:</p>
            <div class = "comment-row"  v-for="c in comments">
                <div class = "comment-from">
                    <a :href = "'#/profile-view?id=' + c.guest.username">{{c.guest.username}} </a>
                </div>
                <div class = "comment-desc">
                 	<p> {{c.text}} </p>
                 </div>
            </div>
            <div class = "leave-comment" >
                <p>Ako ste posetili ovaj apartman, ostavite Vaše utiske</p>
                <input type="text" v-model="textComment" class = "add-comment">
                
                <div class="grade">
                <p>Ocena apartmana:</p> 
                <div class = "col-grades">
                    <div class = "col-grade">
                        <input type="radio"  id="grade"  v-model="grade" name="grade" value="Nedovoljan">
                        <p>Nedovoljan</p>
                    </div>
                    <div class = "col-grade">
                        <input type="radio" id="grade" v-model="grade" name="grade" value="Dovoljan">
                        <p>Dovoljan</p>
                    </div>                    
                    <div class = "col-grade">
                        <input type="radio" id="grade" v-model="grade" name="grade" value="Dobar">
                        <p>Dobar</p>
                    </div>
                    <div class = "col-grade">
                        <input type="radio" id="grade" v-model="grade" name="grade" value="Vrlo dobar">
                        <p>Vrlo dobar</p>
                    </div>
                    <div class = "col-grade">
                        <input type="radio" id="grade" v-model="grade" name="grade" value="Odlican">
                        <p>Odličan</p>
                    </div>
                 </div>
            </div>
            <button class="submit-comment" v-on:click="leaveComment">Ostavi komentar</button>
        </div>

        </div>
    
    </div>
	`,
	mounted () {
		axios
			.get("/apartments/" + this.$route.query.id)
			.then(response => {
				this.apartment = response.data;
				this.mainPicture = response.data.apartmentPictures[0];
				this.checkInTime = response.data.checkInTime;
				this.checkOutTime = response.data.checkOutTime;
				this.numOfGuests = response.data.numberOfGuests;
				this.titleOfApartment= response.data.apartmentTitle;
				this.numOfRooms = response.data.numberOfRooms;
				this.costForNight = response.data.costForNight;
				this.pictures = response.data.apartmentPictures;
				if (response.data.costCurrency == "Euro") {
					this.currency = "€";
				} else if (response.data.costCurrency == "Dollar") {
					this.currency = "$";
				} else {
					this.currency = "RSD";
				}
				this.comments = response.data.comments;
				this.apartmentDesc = response.data.shortDescription;
				this.numOfRows = response.data.apartmentPictures.length / 3 + 1;
				
				for (a of response.data.amenities) {
					this.amenityDetails = a.amenityName + " ";
				}
			});
	    axios
	    	.get('/user/seeIfLogged')
	    	.then(response => {
	    		if (response.data == null) {
	    			canEdit = false;
	    			canReserve = false;
	    			canComment = true;
	    		} else 
	    		{
	    			if (response.data.role == "Guest") {
	    				canEdit = false;
	    				canReserve = true;
	    			} else if (response.data.role == "Host") {
		    			canEdit = false;
		    			canReserve = false;
		    		} else if (response.data.role == "Administrator") {
		    			canEdit = false;
		    			canReserve = false;
		    		
		    		} else {
		    			canEdit = false;
		    			canReserve = false;
		    		
		    		}
	    			this.user = response.data;
	    			
	    		}

    			console.log(canEdit);
	    	})
	},
	methods : {
		leaveComment : function() {
			let commentParameters = {
					text : this.textComment,
					username : "volim-da-putujem",
					grade : this.grade,
					apartment : this.apartment.id
					
					
			};
			
			axios 
				.post("/apartments/leaveComment", JSON.stringify(commentParameters))
				.then(response => {
					if (response.data != null) {

						this.apartment = response.data;
						this.checkInTime = response.data.checkInTime;
						this.checkOutTime = response.data.checkOutTime;
						this.numOfGuests = response.data.numberOfGuests;
						this.titleOfApartment= response.data.apartmentTitle;
						this.numOfRooms = response.data.numberOfRooms;
						this.costForNight = response.data.costForNight;
						this.pictures = response.data.apartmentPictures;
						if (response.data.costCurrency == "Euro") {
							this.currency = "€";
						} else if (response.data.costCurrency == "Dollar") {
							this.currency = "$";
						} else {
							this.currency = "RSD";
						}
						this.comments = response.data.comments;
						this.apartmentDesc = response.data.shortDescription;
						this.numOfRows = response.data.apartmentPictures.length / 3 + 1;
					
					}
				})
			
		},
		changeImage : function(next) {
			this.mainPicture = this.pictures[next];
			console.log(next);
		}
	}
});