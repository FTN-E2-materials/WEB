Vue.component("apartment-details", {
	data: function() {
		return {
			apartment: null,
			id:"",
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
			disabledDates : {},
			canComment: true,
			textComment: "",
			grade: "",
			user: null,
			amenityDetails: "",
			reserve : false,		
	        selectedDate : null,
	        numOfEl : "",
	        length : "",
	        canDelete : false,
	        canDeleteComment : false,
			mode : "",
			numOfNights : "",
			message : ""
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
                <div v-for='j in numOfEl' :key='j'>
					<img v-if="(j+(i-1)*2 -1) < length" v-on:click="changeImage(j+(i-1)*2 -1)" class = "one-image" :src="pictures[j+(i-1)*2 -1]" >
                </div>

            </div>
        </div>
		<div>
		
        </div>
        <div v-bind:hidden="canReserve==false">
		
		
        	<div>
        	<div class = "reserve-apartment">
	        	<p> Unesite željeni datum: </p>
	        	<vuejs-datepicker name="startDate" class = "date-res" type="date" v-model="selectedDate" :disabledDates="disabledDates" format="dd.MM.yyyy."></vuejs-datepicker>

 
            </div>
            <div class = "reserve-apartment">
            	<p> Broj noćenja: </p>
	            <input type = "number" min="1" v-model="numOfNights" class = "number">     
            </div>
            <div class ="reserve-apartment">
            	<p> Poruka domaćinu: </p>
	            <input type = "text" v-model="message">  
	         </div>
            <button v-on:click="showForm" class="submit">Rezerviši</button>
            </div>
        </div>
        <div  v-bind:hidden="canEdit==false" >
        <button v-on:click="EditApartment"class="submit">Izmeni apartman?</button>

		</div> 
		<div  v-bind:hidden="canDelete==false" >
        	<button v-on:click="deleteApartment" class="submit">Obriši apartman?</button>
		</div> 
        <div class = "comments" id="comment-section">
            <p>Komentari:</p>
            <div class = "comment-row"  v-for="c in comments">
            	<div v-if="canSeeDeleted(c)">
	                <div class = "comment-from">
	                    <a :href = "'#/profile-view?id=' + c.guest.username">{{c.guest.username}} </a>
	                </div>
	                <div class = "comment-desc">
	                 	<p> {{c.text}} </p>
	                 </div>
	                 <div v-bind:hidden="canDeleteComment==false">
	                 	<a v-if="c.hidden==false" href="#" @click="deleteComment(c)" class="hide-comment"> Sakrij komentar </a>
	                 	<a v-if="c.hidden==true" href="#" @click="showComment(c)" class="hide-comment"> Prikaži komentar </a>
	                 </div>
                 </div>
            </div>
            <div class = "leave-comment" v-bind:hidden="canComment==false">
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
				this.id = response.data.id;
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
				
				this.length = response.data.apartmentPictures.length;
				this.comments = response.data.comments;
				this.apartmentDesc = response.data.shortDescription;
				
				this.numOfRows = Math.ceil(response.data.apartmentPictures.length / 3) ;
				if (response.data.apartmentPictures.length < 3) {
					this.numOfEl = response.data.apartmentPictures.length;
				} else {
					this.numOfEl = 3;
					console.log("aSdasdsa");
				}
				
				console.log(this.numOfEl);
				console.log(this.numOfRows);
				
				for (a of response.data.amenities) {
					this.amenityDetails = this.amenityDetails + a.amenityName + " ";
				}

				var d = new Date();
				
			    axios 
		    	.get("apartments/getDisabledDates/" + this.$route.query.id)
		    	.then(response => {
		    		let disabled = [];
		    		for (reservation of response.data) {

			    		let date = moment(reservation.startDate).format("YYYY-MM-DD");
			    		let toDate = new Date(date);
			    		console.log(date);
		    			disabled.push({from : toDate, to : new Date(toDate.getTime() + reservation.numberOfNights*24*60*60*1000)});
		    		}

				    let lastDate = new Date();
					for (period of this.apartment.periodsForRent) {
			    		let date = moment(period.startDate).format("YYYY-MM-DD");
			    		let toDate = new Date(date);
				    	if (this.isAfterToday(toDate)) {
				    		disabled.push({
					    		from : lastDate,
					    		to : toDate
					    	});
					    	lastDate = new Date(moment(period.endDate).format("YYYY-MM-DD"));
				    	}
				    }
					
					for (a of disabled) {
						console.log(a.from + " " + a.to);
					}
					this.disabledDates["ranges"] = disabled;
					this.disabledDates["to"] = new Date(Date.now());
		    	})
			});
	    axios
	    	.get('/user/seeIfLogged')
	    	.then(response => {
	    		if (response.data == null) {
	    			this.canEdit = false;
	    			this.canReserve = false;

					this.canComment = false;
					this.canDelete = false;
					console.log("ne valja");
					this.canComment = false;
					this.canDeleteComment = false;
					console.log("wuuuuuuuuuuuuuuuuuuuut");
				
	    		} else 
	    		{
	    			this.mode = response.data.role;
	    			if (response.data.role === "Guest") {
	    				this.canEdit = false;
	    				this.canReserve = true;
						this.canDelete = false;
						this.canDeleteComment = false;
						console.log("wut");

						axios 
							.get("apartment/canIComment/" + this.$route.query.id)
							.then(response => {
								this.canComment = response.data;
							})
 	    			} else if (response.data.role === "Host") {
		    			this.canReserve = false;
						this.canComment = false;
			    		axios
				    	.get("user/canIEdit/" + this.$route.query.id)
				    	.then(response => {
				    		this.canEdit = response.data;
							this.canDelete = response.data;
							this.canDeleteComment = true;
				    		
				    		console.log(response.data);
				    	});
		    		} else if (response.data.role === "Administrator") {
		    			this.canEdit = true;
		    			this.canReserve = false;
						this.canComment = false;
						this.canDelete = true;
						this.canDeleteComment = false;
		    		
		    		} else {
		    			this.canEdit = false;
		    			this.canReserve = false;
						this.canDelete = false;
						this.canDeleteComment = false;
		    		}
	    			
	    		}
		    
	    	})
	    

	},
	methods : {
		isAfterToday : function(date) {
			if (date.getTime() <= (new Date()).getTime()) {
				return false;
			} else {
				return true;
				console.log("ASdassa");
			}
		},
		leaveComment : function() {
			let commentParameters = {
					text : this.textComment,
					grade : this.grade,
					apartment : this.apartment.id
					
					
			};
			
			axios 
				.post("/apartments/leaveComment", JSON.stringify(commentParameters))
				.then(response => {
					if (response.data != null) {
						toast("Uspešno ste komentarisali!");
						this.textComment = "";
						this.grade = "";
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
						
					
					} else {
						toast("Došlo je do neke greške!");
					}
				})
			
		},
		deleteApartment : function() {
			if (confirm("Da li ste sigurni da želite da obrišete ovaj apartman?")) {
				axios
					.delete("apartment/deleteApartment/" + this.$route.query.id)
					.then(response => {
						if (response.data) {
							toast("Uspešno ste obrisali apartman!");
							window.location.href = "#/apartments";
						} else {
							toast("Došlo je do neke greške!");
						}
					})
			}
		},
		changeImage : function(next) {
			this.mainPicture = this.pictures[next];
			console.log(next);
		},
		showForm : function() {
			let parameters = {
				apartment : this.apartment,
				startDate : moment(this.selectedDate).format("DD.MM.YYYY."),
				numberOfNights : this.numOfNights,
				message : this.message
			};
			
			axios 
				.post("apartment/reserveApartment", JSON.stringify(parameters))
				.then(response => {
					if (response.status == 500) {
						toast("Došlo je do greške na serveru.");
					} else {
						if (response.data != null) {
							toast("Uspešno ste rezervisalil apartman!");
						} else {
							toast("Nemoguće je rezervisati apartman u tom periodu!");
						}
					}
				})
		},
		EditApartment:function(){
			window.location.href = "#/edit_apartment?id=" + this.$route.query.id;
		},
		deleteComment : function(comment) {
			
			if (confirm("Da li ste sigurni da želite da sakrijete komentar?")) {
				let object = {
						apId : this.$route.query.id,
						commentId : comment.id
				}
				
				axios
					.post("apartment/hideComment", JSON.stringify(object))
					.then(response => {
						if (response.data) {
							this.comments = response.data.comments;
						}
					})
			}
		},
		
		showComment : function (comment) {

			
			if (confirm("Da li ste sigurni da želite da prikažete komentar?")) {
				let object = {
						apId : this.$route.query.id,
						commentId : comment.id
				}
				
				axios
					.post("apartment/showComment", JSON.stringify(object))
					.then(response => {
						if (response.data) {
							this.comments = response.data.comments;
						}
					})
			}
		},
		canSeeDeleted : function(comment) {
			if (!comment.hidden) {
				return true;
			}
			
			if (comment.hidden && this.mode === 'Administrator') {
				return true;
			}
			
			if (comment.hidden && this.mode === 'Guest') {
				return false;
			}
			
			if (this.canDeleteComment && comment.hidden && this.mode === 'Host') {
				return true;
			}
		}
	},
	components : { 
		vuejsDatepicker
	}
});