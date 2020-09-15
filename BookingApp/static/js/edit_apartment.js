
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

Vue.component("edit_apartment", {
    data: function(){
        return {
            apartmentName:'',
            apartmentType:'',
            guestsNumber:'',
            numberOfRooms:'',
            country:'',
            state:'',
            price:'',
            currency:'',
            applicationTime:'',
            checkOutTime:'',
            next:false,
            numOfImages : 0,
            imageCount : 0,
            images: [],
            formErrorMessage:'',
            imagesForBackend: [],
            imageSize: '40%',
            width:window.screen.availWidth/7,
            places : null,
            amenities : null,
            city : "",
            zipcode : "", 
            longitude : "",
            latitude : "",
            street : "",
            number : "",
            address : "",
            selectedAmenity : [],		
            disabledDates: {
		          to: new Date(Date.now() - 8640000)
	        },
	        currentlyAdded : "",
	        startDate : "",
	        endDate : "",
	        errorName : "",
	        errorType : "",
	        errorStartDate : "",
	        errorEndDate : "",
	        errorCheckIn : "",
	        errorCheckOut : "",
	        errorCurrency : "",
	        errorCost : "",
	        errorGuests : "",
	        errorRooms : "",
	        errorAddress : "",
	        commentsEnabled : false
        }
    },

    template: `
       
<div class="form-part-add">
<h2>Izmenite apartman</h2>
        <table align="left" width="1000px">
    		<tr v-if="imageCount < 4" style="margin-left:5px;">
				<td v-for="(url, index) in images"  v-if="imageCount < 4" >
					<img :src="url" :width="width" v-on:click="deleteImage(index)" />
				</td>
    		</tr>
    	    <tr v-if="(imageCount >= 4) && (imageCount < 8)"  style="margin-left:5px;" width="1000px">
				<td v-for="(url, index) in images"  >
					<img :src="url" :width="width" v-on:click="deleteImage(index)" />
				</td>
    		</tr>
    	</table>
    
            <table class="input-table" align="center">
                <tr><td>Naziv apartmana:</td>
                <td><input type="text" class="input-apt" v-model="apartmentName" v-on:change="signalChange"></td> 
                <td color="red">{{errorName}}</td>
                </tr>
                <tr><td>Tip apartmana: </td>
                <td color="red"><input type="radio"  name="apartmentType" v-on:change="signalChange" value="soba" v-model="apartmentType">Soba 
                <input type="radio" name="apartmentType" v-on:change="signalChange" value="apartman" v-model="apartmentType">Ceo apartman</td>
                <td color="red">{{errorType}}</td>
                </tr>
                <tr><td>Broj gostiju: </td>
                <td><input type="number" class="input-apt" min="1" value="1" v-model="guestsNumber">
                </td>
                <td color="red">{{errorGuests}}</td>
                </tr>
                <tr><td>Broj soba: </td>
                <td ><input type="number" class="input-apt"  min="1" value="1" v-model="numberOfRooms" ></td>
                <td color="red">{{errorRooms}}</td>
                </tr>
                <tr><td>Adresa apartmana: </td>
                <td><input type="search" id="address" v-on:change="signalChange"></td>
                <td color="red">{{errorAddress}}</td>
                </tr>
                <tr><td>Grad: </td>
                <td><input type="text" id="city" class="input-apt" disabled></td>
               </tr>
                <tr><td>Država: </td>
                <td><input type="text" id="country" class="input-apt" disabled></td>
                </tr>
                <tr><td>Početni datum za izdavanje: </td>
                <td><vuejs-datepicker name="startDate" width="250px" class="input-apt" type="date" v-model="startDate" :disabledDates="disabledDates" format="dd.MM.yyyy."></vuejs-datepicker></td>
                <td color="red">{{errorStartDate}}</td>
                </tr>
                <tr><td>Krajnji datum za izdavanje: </td>
                <td color="red"><vuejs-datepicker name="endDate" width="250px" class="input-apt" type="date" v-model="endDate" :disabledDates="disabledDates" format="dd.MM.yyyy."></vuejs-datepicker></td>
                <td color="red">{{errorEndDate}}</td>
                </tr>
                <tr><td>Vreme prijave: </td>
                <td><input type="time" v-model="applicationTime" class="input-apt" v-on:change="signalChange"></td>
                <td color="red">{{errorCheckIn}}</td>
                </tr>
                <tr><td>Vreme odjave: </td>
                <td color="red"><input type="time" v-model="checkOutTime" class="input-apt" v-on:change="signalChange"></td>
                <td color="red">{{errorCheckOut}}</td>
                </tr>
                <tr><td>Cena za jednu noć: </td>
                <td ><input type="number" min="1" v-model="price" class="input-apt" v-on:change="signalChange"></td>
                <td color="red">{{errorCost}}</td>
                </tr>
                <tr><td>Valuta:</td> 
                <td><input type="radio" v-on:change="signalChange" name="valuta" value="RSD" v-model="currency">RSD
                <input type="radio" v-on:change="signalChange" name="valuta" value="Euro" v-model="currency">Euro
                <input type="radio" v-on:change="signalChange" name="valuta" value="Dolar" v-model="currency">Američki dolar

                </td>
                <td color="red">{{errorCurrency}}</td>
                </tr>
                <tr><td>Označite slike apartmana:</td>
                <td><input v-if="imageCount < 5" type="file" @change="imageAdded" />
                 <input v-else type="file" @change="imageAdded" disabled="true"/></td>
                </tr>
                <tr><td>Trenutni sadržaj apartmana: </td><td> </td><td></td></tr>
    			<tr  v-for="a in amenities">
    			<td></td>
		    	<div class = "check-boxes-amenity" v-if="a.deleted==false">
					<div class = "one-check-box">
						<input v-if="isChecked(a)" @click="checkAmenity(a)" type="checkbox" :id="a.id" :name="a.id" :value="a.amenityName" checked>
						<input v-else="isChecked(a)" @click="checkAmenity(a)" type="checkbox" :id="a.id" :name="a.id" :value="a.amenityName">	
						<label class="amenity-label" for="a.amenityName"> {{a.amenityName}}</label><br>
					</div>
				</div>
    			</td>
    			</tr>
    			<tr> <td> Omogući komentare: </td> <td> <input type="checkbox" v-if="isCheckedForCom"  @click="checkedComment" id = "commentsEnabled" checked> <input type="checkbox" v-else @click="checkedComment" id = "commentsEnabled"> Da </td> </tr>
    			<tr><td colspan="2" align="center"> <button class="submit-add-apt" v-on:click="addApartment"> Izmeni </button></td> </tr>
            </table>
    <input id="latitude" hidden>
    <input id="longitude" hidden>
    <input id="zipCode" hidden>
    </div>
    
 ` ,

    mounted () {

    	axios
    		.get("editApartment/canISee")
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
        this.next = false;
        console.log(this.next);
   		

        axios
			.get("/apartments/" + this.$route.query.id)
			.then(response => {
				this.apartmentName = response.data.apartmentTitle;
				if (response.data.type == 'FullApartment') {
					this.apartmentType = "apartman";
				} else {
					this.apartmentType = "soba";
				}
				
				this.guestsNumber = response.data.numberOfGuests;
				this.numberOfRooms = response.data.numberOfRooms;
				this.address = response.data.location.address.address;
				this.country = response.data.location.address.city.state.state;
				this.city = response.data.location.address.city.city;
				if (response.data.costCurrency == "Euro") {
					this.currency = "Euro";
				} else if (response.data.costCurrency == "Dinar") {
					this.currency = "RSD";
				} else {
					this.currency = "Dolar";
				}
				
				this.price = response.data.costForNight;
				this.checkOutTime = response.data.checkOutTime;
				this.applicationTime = response.data.checkInTime;
				this.images = response.data.apartmentPictures;
				

				this.startDate = moment(response.data.periodsForRent.startDate).format("DD.MM.YYYY.");
				this.endDate = moment(response.data.periodsForRent.endDate).format("DD.MM.YYYY.");
				this.zipCode = response.data.location.zipCode;
				this.latitude = response.data.location.latitude;
				this.longitude = response.data.location.longitude;
				
				document.querySelector('#address').value = response.data.location.address.address;
			    document.querySelector('#country').value = response.data.location.address.city.state.state;
			    document.querySelector('#city').value = response.data.location.address.city.city;
			    document.querySelector('#longitude').value = response.data.location.longitude;
			    document.querySelector('#latitude').value = response.data.location.latitude;
			    document.querySelector('#zipCode').value = response.data.location.address.city.zipCode;
			    
			    this.imageCount = response.data.apartmentPictures.length;
			    this.commentsEnabled = response.data.commentsEnabled;
			    this.commentsEnabled = response.data.commentsEnabled;
			    
			    for (a of response.data.amenities) {
			    	console.log(a.amenityName);
			    	this.selectedAmenity.push({
			    		name : a.amenityName,
			    		id : a.id});
			    }
			    
			    for (image of response.data.apartmentPictures) {
			    	this.imagesForBackend.push(image);
			    }
		});
        axios 
        	.get("/amenities")
        	.then(response => {
        		this.amenities = response.data;
 
        			});
        
        this.places = places({
        	appId: 'plQ4P1ZY8JUZ',
        	apiKey: 'bc14d56a6d158cbec4cdf98c18aced26',
        	container: document.querySelector('#address'),
		    templates: {
			      value: function(suggestion) {
			        return suggestion.name;
			      }
			    }
			  }).configure({
			    type: 'address'
			 });

		this.places.on('change', function getLocationData(e) {
			
		    document.querySelector('#address').value = e.suggestion.value || '';
		    document.querySelector('#country').value = e.suggestion.country || '';
		    document.querySelector('#city').value = e.suggestion.city || '';
		    document.querySelector('#longitude').value = e.suggestion.latlng.lng || '';
		    document.querySelector('#latitude').value = e.suggestion.latlng.lat || '';
		    document.querySelector('#zipCode').value = e.suggestion.postcode || '';
		    
		    
		    console.log(this.address);
		  });
    },
    methods : {
    	checkedComment : function() {
    		this.commentsEnabled = !this.commentsEnabled;
    	},
    	isCheckedForCom : function() {
    		return this.commentsEnabled;
    	},
    	isChecked : function(amenity) {
    		for (a of this.selectedAmenity) {
    			if (a.id == amenity.id) {
    				return true;
    			}
    		}
    		return false;
    	},
    	checkAmenity : function(amenity) {
    		let newAmenity = [];
    		for (a of this.selectedAmenity) {
    			if (!(a.id == amenity.id)) {
    				newAmenity.push( {
    					name : a.name,
    					id : a.id});
    				}
    			}
    		this.selectedAmenity = newAmenity;
    	},
       NextButton : function()
       { 
	       	this.address = document.querySelector('#address').value;
	    	this.country = document.querySelector('#country').value;
	    	this.state = document.querySelector('#country').value;
		    this.zipCode = document.querySelector('#zipCode').value;
		    this.longitude = document.querySelector('#longitude').value;
		    this.latitude = document.querySelector('#latitude').value;
		    this.city = document.querySelector('#city').value;
           let flag=true;
           if( this.apartmentType==''||
           this.apartmentName=='' ||
           this.guestsNumber=='' ||
           this.country=='' ||
           this.address=='' ||
           this.price=='' ||
           this.currency=='' ||
           this.applicationTime==''||
           this.checkOutTime=='')
           {
               flag=false;
               this.formErrorMessage="Morate popuniti sva polja u formi.";
               console.log(this.currency);
           }
           if(flag)
           {
                this.next=true;
           }
           
       },
       

       checkValidForm : function()
       { 
	       	this.address = document.querySelector('#address').value;
	    	this.country = document.querySelector('#country').value;
	    	this.state = document.querySelector('#country').value;
		    this.zipCode = document.querySelector('#zipCode').value;
		    this.longitude = document.querySelector('#longitude').value;
		    this.latitude = document.querySelector('#latitude').value;
		    this.city = document.querySelector('#city').value;
           let flag=true;
           if( this.apartmentType=='') {
        	   this.errorType = "Tip apartmana je obavezno polje!";
        	   return false;
           }
           if (this.apartmentName=='') {
        	   this.errorName = "Ime apartmana je obavezno polje!";
        	   return false;
           }
           if (this.guestsNumber == '') {
        	   this.errorGuests = "Broj gostiju je obavezno polje!";
        	   return false;
           }
           
           if (this.numberOfRooms == '') {
        	   this.errorRooms = "Broj soba je obavezno polje!";
        	   return false;
           }
           
           if (this.address == '') {
        	   this.errorAddress = "Adresa je obavezno polje!";
        	   return false;
           }
           
           if (this.currency == '') {
        	   this.errorCurrency = "Valuta je obaveno polje!";
        	   return false;
           }
           
           if (this.price == '') {
        	   this.errorCost = "Cena je obavezno polje!";
        	   return false;
           }
           
           if (this.applicationTime == '') {
        	   this.errorCheckIn = "Vreme prijave je obavezno polje!"; 
        	   return false;
           }
           
           if (this.checkOutTime == '') {
        	   this.errorCheckOut = "Vreme odjave je obavezno polje!";
        	   return false;
           }  
           return true;
       },
       
       BackButton: function()
       {
           this.next=false;
       },
       deleteImage(index)
        {
        this.imageCount--;
        this.images.splice(index,1);
        this.imagesForBackend.splice(index,1);
        },
        imageAdded(e) 
        {
            const file = e.target.files[0];
            this.createBase64Image(file);
            this.imageCount++;
            this.images.push(URL.createObjectURL(file));
            for (i of this.images) {
            	console.log(i);
            }
        },
        createBase64Image(file){
            const reader= new FileReader();
           
            reader.onload = (e) =>{
            	let img = e.target.result;
            	// img.replace("data:image\/(png|jpg|jpeg);base64", "");
            	console.log(img);
                this.imagesForBackend.push(img);
            }
            reader.readAsDataURL(file);
        },
        signalChange : function()
		{
			this.formErrorMessage='';
		    console.log(this.address);

	        this.errorName = ""
	        this.errorType = "";
	        this.errorStartDate = "";
	        this.errorEndDate = "";
	        this.errorCheckIn = "";
	        this.errorCheckOut = "";
	        this.errorCurrency = "";
	        this.errorCost = "";
	        this.errorGuests = "";
	        this.errorRooms = "";
	        this.errorAddress = "";
	        
        },
        addApartment: function()
        {
        	if (this.checkValidForm()) {
	        	this.address = document.querySelector('#address').value;
	        	this.country = document.querySelector('#country').value;
	        	this.state = document.querySelector('#country').value;
			    this.zipCode = document.querySelector('#zipCode').value;
			    this.longitude = document.querySelector('#longitude').value;
			    this.latitude = document.querySelector('#latitude').value;
			    this.city = document.querySelector('#city').value;
	        	
	        	let stateCurr = {
	        		state : this.state
	        	};
	        
	        	let cityCurr = {
	        		state : stateCurr,
	        		city : this.city,
	        		zipCode : this.zipCode
	        	};
	        
	        	let addressCurr = {
	        		city : cityCurr,
	        		address : this.address
	        	};
	        	
	        	let locationCurr = {
	        		latitude : this.latitude,
	        		longitude : this.longitude,
	        		address : addressCurr
	        	};
	        	
	        	if (this.currency === "RSD") {
	        		this.currency = "Dinar";
	        	} else if (this.currency === "EURO") {
	        		this.currency = "Euro";
	        	} else {
	        		this.currency = "Dollar";
	        	}
	        	let amenitiesToSend = [];
	        	for (amenity of this.selectedAmenity) {
	        		amenitiesToSend.push({
	        			amenityName : amenity.name,
	        			id : amenity.id
	        		});
	        	}
	        	for (i of this.imagesForBackend) {
	        		console.log(i);
	        	}
	        	

			    let dateFrom = moment(this.startDate).format("DD.MM.YYYY.");
			    let dateS = new Date(dateFrom);
			    
			    let dateTo = moment(this.startDate).format("DD.MM.YYYY.");
			    let dateE = new Date(dateTo);
			    let period = {
			    		startDate : dateS,
			    		endDate : dateE
			    }
			    
	            let apartmentParameters= {
	                apartmentTitle:this.apartmentName,
	                type:this.apartmentType,
	                numberOfGuests:this.guestsNumber,
	                numberOfRooms:this.numberOfRooms,
	                comments:[],
	                apartmentPictures:this.imagesForBackend,
	              //  country:'',
	               // state:'',
	                location: locationCurr,
	                costForNight:this.price,
	                currency:this.currency,
	                active: false,
	                checkInTime:this.applicationTime,
	                checkOutTime:this.checkOutTime,
	                amenities : amenitiesToSend,
	                id :  this.$route.query.id,
	                startDate : dateFrom,
	                endDate : dateTo
	            
	            };
	
	            axios
					.post('/apartments/updateApartment', JSON.stringify(apartmentParameters))
				    .then(response => {
				    	if (response.data != null && response.data != "") {
				    		toast("Uspesno ste izmenili apartman!");
				    		window.location.href = "#/";
				    		
				    	} else if (response.status == 404) {
				    		toast("Došlo je do neke greške!");
				    	} else {
				    		toast("Došlo je do neke greške!");    		
				    	}
				     });
        	}
        }
    },
	components : { 
		vuejsDatepicker
	}
});